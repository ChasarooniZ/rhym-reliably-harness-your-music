export async function pickDialog(playlists, options) {
  let playlist_content = ``;
  const start = options.start;
  const option_type = options.type;
  if (!start) return;

  // Create clickable song images
  for (let playlist of playlists) {
    playlist_content += `<label class="radio-label">
      <input type="radio" name="song" value="${playlist.id}">
      <img src="${playlist.img}" data-id="${
      playlist.id
    }" style="border:0px; width: 50px; height:50px; cursor: pointer;" class="${
      playlist.name === playlistPrep.slice(start.length) ? "selected" : ""
    }" data-tooltip="${game.i18n.localize("rhym.menu.right-click")}">
      ${playlist.name}
    </label>`;
  }

  let content = `
  <style>
  .songpicker .form-group {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      align-items: flex-start;
    }
    
    .songpicker .radio-label {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      justify-items: center;
      flex: 1 0 20%;
      line-height: normal;
    }

    /* Hide the radio inputs */
    .songpicker input[type="radio"] {
      display: none;
    }
    
    .songpicker img {
      border: 0px;
      width: 50px;
      height: 50px;
      cursor: pointer;
    }
        
    /* CHECKED STYLES */
    .songpicker img.selected {
      outline: 2px solid #f00;
    }
  </style>
  <form class="songpicker">
    <div class="form-group" id="songs">
        ${playlist_content}
    </div>
  </form>
  `;

  let dialog = new Dialog({
    title: options.title,
    content,
    buttons: {
      Cancel: {
        label: `Cancel`,
        callback: () => {},
      },
    },
    render: (html) => {
      // Add click handler for each image to play the song
      html.find("img").on("click", async function () {
        let songId = $(this).data("id");

        // Deselect any previously selected image
        html.find("img").removeClass("selected");
        $(this).addClass("selected");

        // Stop all currently playing mood music
        game.playlists
          .filter((p) => p.playing && p.name.startsWith(start))
          .forEach((p2) => p2.stopAll());

        // Play the selected playlist
        let playlist = game.playlists.get(songId);
        await playlist.playAll();
      });

      html.find("img").on("contextmenu", async function () {
        let playlistId = $(this).data("id");
        const imagePath = await getImageFilePath();

        if (imagePath) {
          // Update the settings
          const settings = game.settings.get(MODULE_ID, option_type);
          settings[playlistId] = imagePath;
          await game.settings.set(MODULE_ID, option_type, settings);

          // Update the image source
          $(this).attr("src", imagePath);

          ui.notifications.notify(
            `Updated image for ${playlistId} to ${imagePath}`
          );
        } else {
          ui.notifications.warn("No new image path selected.");
        }
      });
    },
  }).render(true, { width: 600 });
}

export async function getImageFilePath() {
  return new Promise((resolve, reject) => {
    new Dialog({
      title: "Select an Image",
      content: `
        <form>
          <div class="form-group">
            <label for="image-path">${game.i18n.localize(
              "playlist-image-path"
            )}</label>
            <div style="display: flex; align-items: center;">
              <input id="image-path" type="text" name="image-path"/>
              <button id="file-picker-btn" type="button" class="file-picker" data-type="image" data-target="image-path" title="Image Path" tabindex="-1">
                  <i class="fas fa-file-import fa-fw"></i>
              </button>
            </div>
          </div>
        </form>
      `,
      buttons: {
        submit: {
          label: "Submit",
          callback: (html) => {
            const filePath = html.find('[name="image-path"]').val();
            resolve(filePath);
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
