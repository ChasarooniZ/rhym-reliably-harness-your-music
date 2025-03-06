import { combatDialog } from "./combatDialog.js";

Hooks.once("init", async function () {});

Hooks.once("ready", async function () {
  Hooks.on("createCombat", () => {
    combatDialog();
  });
});
