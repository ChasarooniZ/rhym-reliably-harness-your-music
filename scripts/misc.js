export const MODULE_ID = "rhym";

export function localize(str, options = {}) {
  return game.i18n.format(`${MODULE_ID}.${str}`, options);
}
