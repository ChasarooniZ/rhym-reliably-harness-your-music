import { MODULE_ID } from "../misc.js";

/**
 * Starts one playlist and stops others
 * @param {string[]} prefixes - List of prefixes to stop
 * @param {{playlistID?: string, playlistName?: string}} options - ID or Name of the playlist to start
 */
export async function startPlaylistStopOthers(prefixes, config) {
  // Stop all currently playing playlists with matching prefixes
  game.playlists
    .filter(
      (p) => p.playing && prefixes.some((prefix) => p.name.startsWith(prefix))
    )
    .forEach((p) => p.stopAll());

  // Play the selected playlist
  if (config?.playlistID || config?.playlistName) {
    const playlist = config?.playlistID
      ? game.playlists.get(config?.playlistID)
      : game.playlists.getName(config?.playlistName);

    if (playlist) {
      await playlist.playAll();
    }
  }
}

export function localize(str, options = {}) {
  return game.i18n.format(`${MODULE_ID}.${str}`, options);
}
