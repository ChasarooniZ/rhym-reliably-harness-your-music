import { combatDialog, startPlaylistStopOthers } from "./combatDialog.js";
import { localize, MODULE_ID } from "./misc.js";

Hooks.once("init", async function () {
  Hooks.on("getSceneControlButtons", (controls, _b, _c) => {
    controls
      .find((con) => con.name == "token")
      .tools.push({
        name: MODULE_ID,
        title: localize("controls.hype-music.name"),
        icon: "fas fa-user-music",
        onClick: async () => {
          hypeMusicDialog();
        },
        toolclip: {
          src: "modules/pf2e-rpg-numbers/resources/videos/finishing-move-toolclip.webm",
          heading: localize("controls.hype-music.toolclip.heading"),
          items: [
            {
              paragraph: localize(
                "controls.hype-music.toolclip.items.description.paragraph"
              ),
            },
          ],
        },
      });
  });
});

Hooks.once("ready", async function () {
  Hooks.on("createCombat", () => {
    if (game.settings.get(MODULE_ID, "enabled")) {
      combatDialog();
    }
  });

  Hooks.on("deleteCombat", async (_encounter, _data, _id) => {
    if (game.settings.get(MODULE_ID, "combat-victory.enabled")) {
      await startPlaylistStopOthers(
        [game.settings.get(MODULE_ID, "combat-prefix")],
        {
          playlistName: game.settings.get(MODULE_ID, "combat-victory.playlist"),
        }
      );
    }
  });
});
