import { createItemPickerDialog } from "./lib/picker.js";
import { MODULE_ID } from "./misc.js";

export async function combatDialog() {
  if (!game.user.isGM) return;

  const start = game.settings.get(MODULE_ID, "combat-prefix");
  const playlistPrep = game.settings.get(MODULE_ID, "combat-prep-playlist");

  // Prepare combat playlists
  const playlists = game.playlists
    .filter((p) => p.name.startsWith(start))
    .map((p) => ({
      id: p.id,
      name: p.name.slice(start.length),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (playlists.length === 0) {
    ui.notifications.error(
      "No playlists to select from, look at your RHYM module settings to make sure your prefix matches your playlists"
    );
    return;
  }

  // Determine starting selection
  const startingSelection = playlists.find(
    (p) => p.name === playlistPrep?.slice(start.length)
  )?.id;

  await createItemPickerDialog({
    items: playlists,
    imageSettingsPath: "icon-mapping.combat",
    title: "Pick Combat Music",
    onStart: async () => {
      // Start playlist preparation music
      await startPlaylistStopOthers([start], { playlistName: playlistPrep });
    },
    onClick: async (playlistId) => {
      // Stop all currently playing mood music and start selected playlist
      await startPlaylistStopOthers([start], { playlistID: playlistId });
    },
    startingSelection,
  });
}

/**
 * Starts one playlist and stops others
 * @param {string[]} prefixes - List of prefixes to stop
 * @param {{playlistID?: string, playlistName?: string}} options - ID or Name of the playlist to start
 */
export async function startPlaylistStopOthers(
  prefixes,
  { playlistID, playlistName }
) {
  // Stop all currently playing playlists with matching prefixes
  game.playlists
    .filter(
      (p) => p.playing && prefixes.some((prefix) => p.name.startsWith(prefix))
    )
    .forEach((p) => p.stopAll());

  // Play the selected playlist
  if (playlistID || playlistName) {
    const playlist = playlistID
      ? game.playlists.get(playlistID)
      : game.playlists.getName(playlistName);

    if (playlist) {
      await playlist.playAll();
    }
  }
}
