import { combatDialog, startPlaylistStopOthers } from "./combatDialog.js";
import { MODULE_ID } from "./misc.js";

Hooks.once("init", async function () {});

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
