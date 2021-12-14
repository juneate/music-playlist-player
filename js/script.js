import { getPlaylistFromHTML } from "./playlist.js"
import { loadPlaylist } from "./player.js"







// Other stuff here: https://codepen.io/roccop/pen/NWpeBqw?editors=0010
// Their songs?
// The progress bar needs to be easier to tap into







// Begin
addEventListener(`load`, async () => {

  // 1. Load playlist
  const playlist = await getPlaylistFromHTML(`#pl li`)
  console.log(playlist)

  // 2. Build the player?
  // const player = Player()
  //    Then pass this to the loadPlayer

  // 3. Load the player with the playlist
  loadPlaylist(playlist)

  // 3. Make playlist filterable

})