import { MODULE_ID } from "../misc.js";

/**
 * Creates a generic item picker dialog with customizable behavior
 * @param {Object} config - Configuration object
 * @param {Array} config.items - Array of items with {id, name, img?} properties
 * @param {string} config.imageSettingsPath - Game setting path for image mappings
 * @param {Function} config.onStart - Function called when dialog opens
 * @param {Function} config.onClick - Function called when item is clicked (receives item id)
 * @param {string} [config.startingSelection] - ID of initially selected item
 * @param {string} [config.title="Pick Item"] - Dialog title
 * @param {string} [config.defaultImage="icons/svg/d20-highlight.svg"] - Default image for items
 * @param {number} [config.width=600] - Dialog width
 * @param {number} [config.imageSize=50] - Image size in pixels
 */
export async function createItemPickerDialog(config) {
  const {
    items,
    imageSettingsPath,
    onStart,
    onClick,
    startingSelection = null,
    title = "Pick Item",
    defaultImage = "icons/svg/d20-highlight.svg",
    width = 600,
    imageSize = 50,
  } = config;

  // Validate required parameters
  if (!items || !Array.isArray(items)) {
    throw new Error("Items array is required");
  }
  if (!imageSettingsPath) {
    throw new Error("Image settings path is required");
  }
  if (!onStart || typeof onStart !== "function") {
    throw new Error("onStart function is required");
  }
  if (!onClick || typeof onClick !== "function") {
    throw new Error("onClick function is required");
  }

  // Call onStart callback
  await onStart();

  // Get image mappings from settings
  const imageMappings = game.settings.get(MODULE_ID, imageSettingsPath) || {};

  // Prepare items with images
  const processedItems = items.map((item) => ({
    ...item,
    img: item.img || imageMappings[item.id] || defaultImage,
  }));

  if (processedItems.length === 0) {
    ui.notifications.error("No items available for selection");
    return;
  }

  await showPickerDialog(processedItems);

  async function showPickerDialog(items) {
    let itemContent = "";

    // Create clickable item images
    for (let item of items) {
      const isSelected = startingSelection === item.id;
      itemContent += `
        <label class="radio-label">
          <input type="radio" name="item" value="${item.id}">
          <img src="${item.img}" 
               data-id="${item.id}" 
               style="border:0px; width: ${imageSize}px; height:${imageSize}px; cursor: pointer;" 
               class="${isSelected ? "selected" : ""}" 
               data-tooltip-direction="UP"
               data-tooltip="${
                 game.i18n.localize("rhym.menu.right-click") ||
                 "Right-click to change image"
               }">
          <span class="item-name">${item.name}</span>
        </label>`;
    }

    const content = `
      <style>
        .item-picker .form-group {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          align-items: flex-start;
        }
        
        .item-picker .radio-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          justify-items: center;
          flex: 1 0 20%;
          line-height: normal;
          margin: 5px;
        }

        /* Hide the radio inputs */
        .item-picker input[type="radio"] {
          display: none;
        }
        
        .item-picker img {
          border: 0px;
          width: ${imageSize}px;
          height: ${imageSize}px;
          cursor: pointer;
          transition: outline 0.2s ease;
        }
        
        .item-picker .item-name {
          margin-top: 5px;
          font-size: 12px;
          word-wrap: break-word;
          max-width: ${imageSize + 10}px;
        }
            
        /* SELECTED STYLES */
        .item-picker img.selected {
          outline: 2px solid #f00;
        }
        
        .item-picker img:hover {
          outline: 1px solid #ccc;
        }
        
        .item-picker img.selected:hover {
          outline: 2px solid #f00;
        }
      </style>
      <form class="item-picker">
        <div class="form-group" id="items">
          ${itemContent}
        </div>
      </form>`;

    const dialog = new Dialog({
      title,
      content,
      buttons: {
        Cancel: {
          label: "Cancel",
          callback: () => {},
        },
      },
      render: (html) => {
        // Add click handler for each image
        html.find("img").on("click", async function () {
          const itemId = $(this).data("id");

          // Deselect any previously selected image
          html.find("img").removeClass("selected");
          $(this).addClass("selected");

          // Call the custom onClick handler
          await onClick(itemId);
        });

        // Add right-click handler for changing images
        html.find("img").on("contextmenu", async function (e) {
          e.preventDefault();
          const itemId = $(this).data("id");

          try {
            const imagePath = await getImageFilePath();
            if (imagePath) {
              // Update the settings
              const settings =
                game.settings.get(MODULE_ID, imageSettingsPath) || {};
              settings[itemId] = imagePath;
              await game.settings.set(MODULE_ID, imageSettingsPath, settings);

              // Update the image source
              $(this).attr("src", imagePath);

              ui.notifications.notify(`Updated image for item ${itemId}`);
            }
          } catch (error) {
            if (error !== "Image not added" && error !== "") {
              ui.notifications.error(`Error updating image: ${error}`);
            }
          }
        });

        // If there's a starting selection, trigger its click handler
        if (startingSelection) {
          const startingItem = html.find(`img[data-id="${startingSelection}"]`);
          if (startingItem.length) {
            // Don't trigger the visual selection since it's already applied in CSS
            // Just call the onClick handler
            onClick(startingSelection);
          }
        }
      },
    });

    dialog.render(true, { width });
  }

  async function getImageFilePath() {
    return new Promise((resolve, reject) => {
      new Dialog({
        title: "Select an Image",
        content: `
          <form>
            <div class="form-group">
              <label for="image-path">${
                game.i18n.localize("playlist-image-path") || "Image Path"
              }</label>
              <div style="display: flex; align-items: center;">
                <input id="image-path" type="text" name="image-path"/>
                <button id="file-picker-btn" type="button" class="file-picker" data-type="image" data-target="image-path" title="Image Path" tabindex="-1">
                  <i class="fas fa-file-import fa-fw"></i>
                </button>
              </div>
            </div>
          </form>`,
        buttons: {
          submit: {
            label: "Submit",
            callback: (html) => {
              const filePath = html.find('[name="image-path"]').val();
              resolve(filePath || null);
            },
          },
          cancel: {
            label: "Cancel",
            callback: () => reject("Image not added"),
          },
        },
        render: (html) => {
          html.find("#file-picker-btn").click(async () => {
            const filePicker = new FilePicker({
              type: "image",
              callback: (path) => {
                html.find('[name="image-path"]').val(path);
              },
            });
            filePicker.render(true);
          });
        },
        close: () => reject(""),
      }).render(true);
    });
  }
}
