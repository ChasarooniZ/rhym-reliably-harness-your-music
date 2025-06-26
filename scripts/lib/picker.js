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
               style="border:0px; width: 50px; height:50px; cursor: pointer;" 
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
      <form class="item-picker">
        <div class="item-picker form-group" id="items">
          ${itemContent}
        </div>
      </form>`;

    foundry.applications.api.DialogV2.wait({
      window: {
        title,
        controls: [
          {
            action: "kofi",
            label: "Support Dev",
            icon: "fa-solid fa-mug-hot fa-beat-fade",
            onClick: () => window.open("https://ko-fi.com/chasarooni", "_blank"),
          },
        ],
        icon: "far fa-swords",
      },
      content,
      position: {
        width: width,
      },
      buttons: [
        {
          action: "cancel",
          label: "Cancel",
          callback: () => {},
        },
      ],
      render: (event) => {
        const html = event.target.element;
        // Add click handler for each image
        $(html)
          .find("img")
          .on("click", async function () {
            const itemId = $(this).data("id");

            // Deselect any previously selected image
            $(html).find("img").removeClass("selected");
            $(this).addClass("selected");

            // Call the custom onClick handler
            await onClick(itemId);
          });

        // Add right-click handler for changing images
        $(html)
          .find("img")
          .on("contextmenu", async function (e) {
            e.preventDefault();
            const itemId = $(this).data("id");

            try {
              const settings =
                game.settings.get(MODULE_ID, imageSettingsPath) || {};
              const imagePath = await getImageFilePath(settings?.[itemId]);
              if (imagePath) {
                // Update the settings
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
          const startingItem = $(html).find(
            `img[data-id="${startingSelection}"]`
          );
          if (startingItem.length) {
            // Don't trigger the visual selection since it's already applied in CSS
            // Just call the onClick handler
            onClick(startingSelection);
          }
        }
      },
    });
  }

  async function getImageFilePath(currentPath) {
    let guess;
    try {
      guess = await foundry.applications.api.DialogV2.prompt({
        window: { title: "Select an image" },
        content: `<file-picker name="imagepath" type="image" value="${
          currentPath || ""
        }" autofocus>`,
        buttons: [{ action: "cancel", label: "Cancel" }],
        ok: {
          label: "Submit",
          callback: (event, button, dialog) =>
            button.form.elements.imagepath.value,
        },
      });
    } catch {
      return;
    }
    return guess;
  }
}
