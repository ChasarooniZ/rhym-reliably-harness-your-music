const songPics = {
  "Bellevue Whistle": "icons/tools/instruments/pipe-flue-tan.webp",
  "Memories & Dreams": "icons/league%20of%20legends/abilities/ZoeE.png",
  "Baron's Abominations": "assets/srd5e/img/SCC/Mage%20Hunter.png",
  Finley: "tokenizer/pc-images/finley.AvatarvBBsTeAysPatv7H5.webp",
  "Syla Bron": "tokenizer/pc-images/syla_bron.Avatar.webp",
  Kas: "tokenizer/pc-images/kas.AvatarJqm8DS0hKCMDJKjI.webp",
  Werebat: "tokenizer/npc-images/werebat.Avatar.webp",
  "Vel'Rossa": "tokenizer/npc-images/captain_kalrosa.Token.webp",
  Kraken: "icons/creatures/tentacles/tentacles-octopus-black-pink.webp",
  "Captain Blackdagger": "icons/magic/death/undead-skeleton-energy-green.webp",
  "The Werebat": "tokenizer/npc-images/werebat.Avatar.webp",
  "The Watcher": "icons/magic/perception/eye-slit-pink.webp",
  "Baron Ingleram": "tokenizer/npc-images/Ingleram%20Head.jpg",
  "The Fallen Stars": "icons/magic/light/projectiles-salvo-teal.webp",
  "Goodbye Old Friend": "icons/skills/social/peace-luck-insult.webp",
  "A Mere Diversion": "icons/magic/symbols/question-stone-yellow.webp",
  Requiem: "icons/sundries/books/book-black-grey.webp",
  "The Illithids": "tokenizer/npc-images/mind_flayer.Avatar.webp",
  Working: "pics/Home%20Depot.webp",
  "Elder Tempest A": "pics/elder-tempest.webp",
  "Elder Tempest B": "pics/elder-tempest2.webp",
  "The Faceless One": "pics/faceless-one.webp",
  "The Kraken Society": "pics/Kraken%20Society%20Logo.webp",
  "Baron Ingleram's Offense":
    "icons/creatures/magical/humanoid-silhouette-glowing-pink.webp",
  "Zorte - Visions": "tokenizer/pc-images/zorte.AvatarlnbTninHRW0wlHvC.webp",
  Wrin: "",
  "Wrin Savinxi - Constellations":
    "tokenizer/npc-images/wrin_s_wonders.TokenHA9OdsEGlj0V4WyC.webp",
  Werewolves: "tokenizer/npc-images/werebat.Avatar.webp",
  "Playlist.92Do06RZua1VX28h.PlaylistSound.A3smuZX5at66mEOO":
    "https://upload.wikimedia.org/wikipedia/en/thumb/7/78/STAND_PROUD.jpg/250px-STAND_PROUD.jpg",
  "Playlist.92Do06RZua1VX28h.PlaylistSound.NcYsd6xbA295Mgua":
    "https://www.printmag.com/wp-content/uploads/2022/01/0008811069926_p0_v3_s1200x630.jpeg",
  "Playlist.92Do06RZua1VX28h.PlaylistSound.BbUrK3jDzpRWBR7T":
    "https://www.moshimoshi-nippon.jp/wp/wp-content/uploads/2018/11/LiSA-ADAMAS-2.jpeg",
  "Playlist.92Do06RZua1VX28h.PlaylistSound.Gansty0QkcOAipR9":
    "https://i1.sndcdn.com/artworks-000058525419-rvp3x6-t500x500.jpg",
  "Playlist.92Do06RZua1VX28h.PlaylistSound.3Z3Nie51fTZscSw2":
    "https://i.scdn.co/image/ab67616d0000b273602547711e0e84c5915ebdef",
  "Playlist.92Do06RZua1VX28h.PlaylistSound.jjdAmW8QPKflzXwa":
    "https://guiltygear.wiki.gg/images/e/e9/SotG_single_cover.jpg?f942f3",
  "Playlist.92Do06RZua1VX28h.PlaylistSound.5EKUk8CwVkmhChAs":
    "https://i1.sndcdn.com/artworks-000624022933-r48n3q-t500x500.jpg",
  "Playlist.92Do06RZua1VX28h.PlaylistSound.Vqz4wU1WZz3dUZRu":
    "pics/theatre/pcs/pedro.theatre.default.webp",
  "Playlist.92Do06RZua1VX28h.PlaylistSound.EFUVMxzywkMG0uOT":
    "https://i.ebayimg.com/images/g/ZkQAAOSwSRRkn1eA/s-l400.jpg",
  "Playlist.92Do06RZua1VX28h.PlaylistSound.gg6udoPhphoj7tP7":
    "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84f8b04b69561ff87da26c38ed",
  "Playlist.92Do06RZua1VX28h.PlaylistSound.WXBiEbaQ0En3jYJx":
    "https://i.ebayimg.com/images/g/4zEAAOSwaAhkHarA/s-l400.jpg",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
  "": "",
};
const def_pic =
  "modules/jb2a_patreon/Library/Generic/Music_Notation/BassClef_01_Regular_Blue_Thumb.webp";

export async function hypeMusicDialog() {
  let motifs = game.playlists.getName("『Combat』Hype");
  let songs = motifs.sounds
    .map((p) => ({
      name: p.name,
      id: p.id,
      img: songPics[p.uuid] || def_pic,
    }))
    .sort((a, b) => {
      let a2 = a.name.startsWith("The ") ? a.name.slice(4) : a.name;
      let b2 = b.name.startsWith("The ") ? b.name.slice(4) : b.name;
      return a2.localeCompare(b2);
    });
  let res = await pickDialog(songs);
  let sound = motifs.sounds.get(res);
  motifs.stopAll(); // Stops all currently playing mood music
  await motifs.playSound(sound);

  async function pickDialog(songs) {
    let song_content = ``;

    //Filter for songs
    for (let song of songs) {
      song_content += `<label class="radio-label">
        <input type="radio" name="song" value="${song.id}">
        <img src="${song.img}" style="border:0px; width: 50px; height:50px;">
        ${song.name}
      </label>`;
    }
    let content = `
    <style>
    .songpicker .form-group {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        align-items: flex-start;
      }
      
      .songpicker .radio-label {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        justify-items: center;
        flex: 1 0 25%;
        line-height: normal;
      }
      
      .songpicker .radio-label input {
        display: none;
      }
      
      .songpicker img {
        border: 0px;
        width: 50px;
        height: 50px;
        flex: 0 0 50px;
        cursor: pointer;
      }
          
      /* CHECKED STYLES */
      .songpicker [type=radio]:checked + img {
        outline: 2px solid #f00;
      }
    </style>
    <form class="songpicker">
      <div class="form-group" id="songs">
          ${song_content}
      </div>
    </form>
    `;

    let image = new Promise((resolve) => {
      new Dialog({
        content,
        buttons: {
          Ok: {
            label: `Play Song`,
            callback: async (html) => {
              let itemId = $("input[type='radio'][name='song']:checked").val();
              resolve(itemId);
            },
            icon: '<i class="fa-solid fa-circle-play"></i>',
          },
          Cancel: {
            label: `Cancel`,
            callback: async (html) => {
              return;
            },
          },
        },
      }).render(true);
    });
    return image;
  }
}
