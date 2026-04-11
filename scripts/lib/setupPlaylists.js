async function setupFolder() {
  await new Folder({
    depth: 1,
    description: "A folder made by Rhym to place all of its playlists in",
    type: "Playlist",
    name: "_Rhym",
    flags: {
      rhym: {
        playlistfolder: true,
      },
    },
  });
}

async function setupUserPlaylists() {
    
}
