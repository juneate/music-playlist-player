import { getPlaylistFromHTML } from "./playlist.js"
import { setupPlayer } from "./player.js"



// Other stuff here: https://codepen.io/roccop/pen/NWpeBqw?editors=0010
// Their songs?
// The progress bar needs to be easier to tap into



// Begin
addEventListener(`load`, async () => {

  // 1. Load playlist
  const playlist = await getPlaylistFromHTML(`#playlist`)
  console.log(playlist)

  // 2. Build the player?
  // const player = Player()
  //    Then pass this to the loadPlayer

  // 3. Load the player with the playlist
  setupPlayer(playlist)

  // 3. Make playlist filterable

})