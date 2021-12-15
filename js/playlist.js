import { loadTrack, updatePlayer } from './player.js'

export const getPlaylistFromHTML = async (plSelector, songSelector = `${plSelector} > *`) => {

  const playlist = document.querySelector(plSelector)
  const songs = document.querySelectorAll(songSelector)

  if (songs) {
    const tracks = Array.from(songs).map((track, index) => {
      // Store all "data-" attribute data to the object, as well as as reference to the element
      track.dataset.index = index
      return {...track.dataset, ref: track}
    })
  }

  if (playlist) {
    playlist.addEventListener(`click`, event => {
      const ele = event.target.closest(songSelector)
      if (!ele) return

      loadTrack(tracks, ele.dataset.index).then((currTrack) => {
        updatePlayer(true)
      })
    })
  }

  return tracks
}


/* const setPlaylistToHtml = async (selector) => {
  
  // Should receive this information as a 2nd incoming parameter
  const tracks = [
    `https://www.bensound.com/bensound-music/bensound-sunny.mp3`,
    `https://cdn.pixabay.com/audio/2021/11/13/audio_cb4f1212a9.mp3`
  ]

  const playlistEle = document.querySelector(selector)  // #playlist
  playlistEle.innerHTML = 
    tracks
      .map((track, i) => `<li data-id="${i}"><button><i class="far fa-play-circle"></i></button>${track}</li>`)
      .join(``)
} */

