## 0.6.0 - Titling

- `New`
  - `Track Titles` - New option on playlists to display track titles as a little animation
- `Updated`
  - Improved Localization

## 0.5.2 - Stop Preparing

- `Updated`
  - Opening the `Combat` music manager manually does not automatically start playing the `Preparation` music

## 0.5.1 - Please Stop the Music

- `Updated`
  - Playing a combat track now stops `Mood` music (🧠 @Maple)

## 0.5.0 - Contextual Button

- `New`
  - Changed both the Hotkey and Tool for `Mood Music` to be a contextual `Music Dialog` which opens either `Combat` or `Mood` depending on the scenario (🧠 @Maple)
- `Updated`
  - Updated the icons shown for each dialog type to match the dialog

## 0.4.2 - Emergency Fix

- Fix `setinterval` to `setTimeout`

## 0.4.1 - Error Fix

- Fix misc error

## 0.4.0 - The Mood

- `New`
  - `Mood Music Management` - Added a similar picker to manage mood
    - Includes a control and a hotkey `M`
    - Will automatically open after combat
  - `Victory Duration` - Can set a limited amount of time to play the victory music for
- `Updated`
  - Fixed image filepicker not working

## 0.3.0 - V13

- `Updates`
  - Now supports `v13`
  - Updated dialog to `DialogV2`
  - Generalized the playlist picker dialog to make adding new dialogs easier

## 0.2.0 - Victory!

- `New`
  - **Combat Victory Playlist**
    - Adds a new option to set a Combat Victory Playlist
    - When combat is ended it will pause all playing combat playlists and play the `Victory Playlist`

## 0.1.0 - Initial Release

- Initial bare bones release of this module
- `Combat Music Management` (basic)
  - When combat is created it does the following
    - Opens a dialog with a list of all Combat playlists (ones that use the prefix set in settings)
      - If you **Left Click** a playlist you can set it as the active playing playlist
      - If you **Right Click** a playlist you can change the icon
    - IF a Preparations playlist is set, it Will play it when a combat is created, until you select a separate playlist
