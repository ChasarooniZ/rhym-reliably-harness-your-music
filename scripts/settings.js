import { MODULE_ID } from "./misc.js";
import { contextualMusicDialog } from "./module.js";
import { moodDialog } from "./moodDialog.js";

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

  game.settings.register(MODULE_ID, "combat-victory.duration", {
    name: game.i18n.localize(
      "rhym.module-settings.combat-victory.duration.name"
    ),
    hint: game.i18n.localize(
      "rhym.module-settings.combat-victory.duration.hint"
    ),
    scope: "world",
    config: true,
    range: {
      min: 0,
      max: 100,
      step: 1,
    },
    default: 15,
    type: Number,
  });

  game.settings.register(MODULE_ID, "mood-prefix", {
    name: game.i18n.localize("rhym.module-settings.mood-prefix.name"),
    hint: game.i18n.localize("rhym.module-settings.mood-prefix.hint"),
    scope: "world",
    config: true,
    default: "『Mood』",
    type: String,
  });

  game.settings.register(MODULE_ID, "icon-mapping.mood", {
    name: "",
    hint: "",
    scope: "world",
    config: false,
    default: {},
    type: Object,
  });

  game.keybindings.register(MODULE_ID, "music-dialog", {
    name: game.i18n.localize(`${MODULE_ID}.controls.music.name`),
    hint: game.i18n.localize(`${MODULE_ID}.controls.music.hint`),
    editable: [
      {
        key: "KeyM",
      },
    ],
    onDown: (context) => {
      contextualMusicDialog();
    },
    onUp: () => {},
    restricted: true, // Restrict this Keybinding to gamemaster only?
    precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL,
  });
});

// export function registerKeybindings() {

// }
