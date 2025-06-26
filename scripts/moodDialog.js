import { startPlaylistStopOthers } from "./lib/helper.js";
import { createItemPickerDialog } from "./lib/picker.js";
import { MODULE_ID } from "./misc.js";

export async function moodDialog() {
  if (!game.user.isGM) return;

  const start = game.settings.get(MODULE_ID, "mood-prefix");
  const combat = game.settings.get(MODULE_ID, "combat-prefix");

  // Prepare mood playlists
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

  await createItemPickerDialog({
    items: playlists,
    imageSettingsPath: "icon-mapping.mood",
    title: "Pick Mood Music",
    onStart: async () => {
      // Start playlist preparation music
      //   await startPlaylistStopOthers([start]);
    },
    onClick: async (playlistId) => {
      // Stop all currently playing mood music and start selected playlist
      await startPlaylistStopOthers([start, combat], {
        playlistID: playlistId,
      });
    },
  });
}
