import { MODULE_ID } from "./misc.js";

Hooks.on("init", () => {
  game.settings.register(MODULE_ID, "enabled", {
    name: game.i18n.localize("rhym.module-settings.enabled.name"),
    hint: game.i18n.localize("rhym.module-settings.enabled.hint"),
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });

  game.settings.register(MODULE_ID, "combat-prefix", {
    name: game.i18n.localize("rhym.module-settings.combat-prefix.name"),
    hint: game.i18n.localize("rhym.module-settings.combat-prefix.hint"),
    scope: "world",
    config: true,
    default: "『Combat』",
    type: String,
  });

  game.settings.register(MODULE_ID, "icon-mapping.combat", {
    name: "",
    hint: "",
    scope: "world",
    config: false,
    default: {},
    type: Object,
  });

  game.settings.register(MODULE_ID, "combat-prep-playlist", {
    name: game.i18n.localize("rhym.module-settings.combat-prep-playlist.name"),
    hint: game.i18n.localize("rhym.module-settings.combat-prep-playlist.hint"),
    scope: "world",
    config: true,
    default: "『Combat』Preparations",
    type: String,
  });

  game.settings.register(MODULE_ID, "combat-victory.enabled", {
    name: game.i18n.localize(
      "rhym.module-settings.combat-victory.enabled.name"
    ),
    hint: game.i18n.localize(
      "rhym.module-settings.combat-victory.enabled.hint"
    ),
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });

  game.settings.register(MODULE_ID, "combat-victory.playlist", {
    name: game.i18n.localize(
      "rhym.module-settings.combat-victory.playlist.name"
    ),
    hint: game.i18n.localize(
      "rhym.module-settings.combat-victory.playlist.hint"
    ),
    scope: "world",
    config: true,
    default: "『Combat』Victory",
    type: String,
  });
});
