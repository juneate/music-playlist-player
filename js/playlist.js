import { loadTrack } from './player.js'

export const getPlaylistFromHTML = async (selector) => {

  const pl = document.querySelectorAll(selector)

  // Store all "data-" attribute data to the object, as well as as reference to the element
  const playlist = Array.from(pl).map(track => {
    const trackData = {...track.dataset, ref: track}
    // track.addEventListener(`click`, event => {
    //   loadTrack(trackData)
    // })
    return trackData
  })

  return playlist
}




const setPlaylistToHtml = async (selector) => {
  
  // Should receive this information as a 2nd incoming parameter
  const playlist = [
    `https://www.bensound.com/bensound-music/bensound-sunny.mp3`,
    `https://cdn.pixabay.com/audio/2021/11/13/audio_cb4f1212a9.mp3`
  ]

  const playlistEle = document.querySelector(selector)  // #playlist
  playlistEle.innerHTML = 
    playlist
      .map((track, i) => `<li data-id="${i}"><button><i class="far fa-play-circle"></i></button>${track}</li>`)
      .join(``)
}

