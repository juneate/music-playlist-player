import { getPlaylistFromHTML } from "./playlist.js"
import { setupPlayer } from "./player.js"


// Begin
addEventListener(`load`, async () => {

  // 1. Load playlist
  const playlist = await getPlaylistFromHTML(`#audioPlaylist`)
  console.log(playlist)

  // 2. Build the player?
  // const player = Player()
  //    Then pass this to the loadPlayer

  // 3. Load the player with the playlist
  setupPlayer(playlist)

  // 4. Make playlist filterable

})