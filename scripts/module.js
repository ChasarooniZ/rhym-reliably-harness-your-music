import { combatDialog } from "./combatDialog.js";
import { MODULE_ID } from "./misc.js";

Hooks.once("init", async function () {});

Hooks.once("ready", async function () {
  Hooks.on("createCombat", () => {
    if (game.settings.get(MODULE_ID, "enabled")) {
      combatDialog();
    }
  });
});
