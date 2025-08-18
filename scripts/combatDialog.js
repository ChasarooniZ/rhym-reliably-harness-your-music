import { startPlaylistStopOthers } from "./lib/helper.js";
import { createItemPickerDialog } from "./lib/picker.js";
import { MODULE_ID } from "./misc.js";

export async function combatDialog(playPrep = false) {
  if (!game.user.isGM) return;

  const start = game.settings.get(MODULE_ID, "combat-prefix");
  const mood = game.settings.get(MODULE_ID, "mood-prefix");
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
    icon: "far fa-swords",
    onStart: async () => {
      // Start playlist preparation music
      await startPlaylistStopOthers([start], {
        ...(playPrep ? { playlistID: startingSelection } : {})
      });
    },
    onClick: async (playlistId) => {
      // Stop all currently playing mood music and start selected playlist
      await startPlaylistStopOthers([start, mood], { playlistID: playlistId });
    },
    startingSelection,
  });
}
