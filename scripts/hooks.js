import { combatDialog } from "./combatDialog.js";
Hooks.on("ready", async () => {
  Hooks.on("createCombat", () => {
    combatDialog();
  });
});
