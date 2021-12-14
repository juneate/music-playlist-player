const playPause = document.getElementById(`playPause`)
const audioPlayer = document.getElementById(`audioPlayer`)
const trackTime = document.getElementById(`trackTime`)
const trackDuration = document.getElementById(`trackDuration`)
const trackProgress = document.getElementById(`trackProgress`)

let currTrack = new Audio()
let isPlaying = false
let draggingProgress = false

const trackDataToDom = [
	{ id: `trackName`,		prop: `name`,		default: `Track Name` },
	{ id: `trackArtist`,	prop: `artist`,	default: `Artist Name` },
	{ id: `trackImage`,		prop: `img`,		default: `img/some-default-image.jpg` },
]

// TODO:
// Only do the control events when the track is loaded...
// If dragged but dropped in the same place, the `change` doesn't fire, leaving the draggingProgress on true
// Make end of song go to the next song
// Check what happens if the song ends when dragging
// Make clicking song from playlist act as "play"
// When playlist song is clicked, the player slips to the middle
// Probably really need a state machine here
// Volume
// Default image
// Style list items
// Confirm that each src isn't getting its own events (that would solve some of the above, acting as a state machine almost)


currTrack.addEventListener(`durationchange`, () => {
	const duration = currTrack.duration === Infinity ? 0 : currTrack.duration ?? 0
	console.log(currTrack.duration)

	if (trackDuration) {
		trackDuration.textContent = `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, `0`)}`
	}
})

currTrack.addEventListener(`timeupdate`, () => {
	const time = currTrack.currentTime || 0

	if (trackTime) {
		trackTime.textContent = `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, `0`)}`
	}

	if (trackProgress && !draggingProgress) {
		trackProgress.value = time / currTrack.duration
	}
})

trackProgress.addEventListener(`input`, event => {
	console.log(`input`)
	draggingProgress = true
})
trackProgress.addEventListener(`change`, event => {
	// Stop music on pickup of the control
	console.log(`changed`)
	
	draggingProgress = false


	currTrack.currentTime = event.target.value * currTrack.duration
})

const updatePlayer = () => {
	if (isPlaying) {
		currTrack.play().then(() => {
			console.log(`🎶 ${currTrack.src} is now playing`)
			//audioPlayer.style.setProperty(`--dur`, track.duration)
			audioPlayer.classList.add(`playing`)
				playPause.querySelector(`i`).classList.remove(`fa-play-circle`)
				playPause.querySelector(`i`).classList.add(`fa-pause-circle`)
		})
	} else {
		currTrack.pause()
		console.log(`🛑 ${currTrack.src} has been paused`)
		audioPlayer.classList.remove(`playing`)
			playPause.querySelector(`i`).classList.add(`fa-play-circle`)
			playPause.querySelector(`i`).classList.remove(`fa-pause-circle`)
	}
}

export const loadTrack = (track) => {
	console.log(`✅ Loading up ${track.src}`)

	// Assign the track a new source url
	currTrack.src = track.src

	// Loop every property and see if it has a corresponding element	
	trackDataToDom.forEach(t => {
		const ele = document.getElementById(t.id)
		if (ele) {
			ele.textContent = track[t.prop] ?? t.default
		}
	})

	updatePlayer()
	
	return currTrack
}




// Move this
export const loadPlaylist = (playlist) => {
	isPlaying = false

	let currTrackData = playlist[0]
	currTrack = loadTrack(currTrackData)

	playPause.addEventListener(`click`, event => {

		isPlaying = !isPlaying // Flip the player
		updatePlayer()
	})

}