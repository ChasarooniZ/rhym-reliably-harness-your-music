import { combatDialog } from "./combatDialog.js";
import { localize, startPlaylistStopOthers } from "./lib/helper.js";
import { MODULE_ID } from "./misc.js";
import { moodDialog } from "./moodDialog.js";

Hooks.once("init", async function () {
  Hooks.on("getSceneControlButtons", (controls, _b, _c) => {
    if (!game.user.isGM && !game.settings.get(MODULE_ID, "enabled")) return;

    const toolData = {
      name: "music",
      title: localize("controls.music.name"),
      button: true,
      icon: "fas fa-user-music",
      onClick: async () => {
        contextualMusicDialog();
      },
      toolclip: {
        src: "modules/rhym/resources/videos/mood-music-toolclip.webm",
        heading: localize("controls.music.toolclip.heading"),
        items: [
          {
            paragraph: localize(
              "controls.music.toolclip.items.description.paragraph"
            ),
          },
        ],
      },
    };

    if (Array.isArray(controls)) {
      controls.find((con) => con.name == "token").tools.push(toolData);
    } else {
      controls.tokens.tools["music"] = toolData;
    }
  });
});

Hooks.once("ready", async function () {
  Hooks.on("createCombat", () => {
    if (game.settings.get(MODULE_ID, "enabled")) {
      combatDialog();
    }
  });

  Hooks.on("deleteCombat", async (_encounter, _data, _id) => {
    if (game.settings.get(MODULE_ID, "enabled")) {
      if (game.settings.get(MODULE_ID, "combat-victory.enabled")) {
        await startPlaylistStopOthers(
          [game.settings.get(MODULE_ID, "combat-prefix")],
          {
            playlistName: game.settings.get(
              MODULE_ID,
              "combat-victory.playlist"
            ),
          }
        );
        const duration = game.settings.get(
          MODULE_ID,
          "combat-victory.duration"
        );
        if (duration !== 0) {
          setTimeout(
            async () =>
              await startPlaylistStopOthers([
                game.settings.get(MODULE_ID, "combat-prefix"),
              ]),
            duration * 1000
          );
        }
      }
      await moodDialog();
    }
  });

  Hooks.on('updatePlaylist', (playlist, update, _info, _playerID) => {
    if (!game.user.isGM) return;
    const newSongID = update?.sounds?.find(s => s.playing)?._id;
    if (newSongID) {
      
    }
  })
});


export async function contextualMusicDialog() {
  if (game?.combat) {
    combatDialog({ playPrep: true })
  } else {
    moodDialog();
  }
}