import { formatTime } from './utils.js'

const playPause = document.getElementById(`playPause`)
const audioPlayer = document.getElementById(`audioPlayer`)
const trackTime = document.getElementById(`trackTime`)
const trackDuration = document.getElementById(`trackDuration`)
const trackProgress = document.getElementById(`trackProgress`)

let currTrack = new Audio()
let draggingProgress = false

const trackDataToDom = [
	{ id: `trackName`,		prop: `name`,		default: `Track Name` },
	{ id: `trackArtist`,	prop: `artist`,	default: `Artist Name` },
	{ id: `trackImage`,		prop: `img`,		default: `img/some-default-image.jpg` },
]

// Current song being played from the [song] array above
let indexToPlay = 0

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
// Add `.playing` class to the player, add `.playing` to the song



const updatePlayer = (play = false) => {
	if (currTrack.paused || play) {
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

const updateTimestamp = (ele, time) => {
	const adjustedTime = time === Infinity ? 0 : time ?? 0
	console.log(`${time} >> ${adjustedTime}`)

	if (ele) {
		ele.textContent = formatTime(adjustedTime)
	}

	return adjustedTime
}


export const loadTrack = (tracks, index = 0) => {
	
	const track = tracks[index]
	console.log(`✅ Loading up ${track.src}`)

	// Loop every property and see if it has a corresponding element	
	trackDataToDom.forEach(t => {
		const ele = document.getElementById(t.id)
		if (ele) {
			ele.textContent = track[t.prop] ?? t.default
		}
	})

	return new Promise(resolve => {
		// Assign the track a new source url
		currTrack.src = track.src

		if (currTrack.readyState != 4) {
			console.log(`loading...`, currTrack.readyState)
			currTrack.addEventListener(`canplaythrough`, event => {
				console.log(`...track is loaded!`, currTrack.duration)

				// Can setup a promise here to use an interval to wait for the time, then resolve once complete

				updateTimestamp(trackDuration, currTrack.duration)
				resolve(currTrack)
			})
		} else {
			updateTimestamp(trackDuration, currTrack.duration)
			resolve(currTrack)
		}
	})
}

export const setupPlayer = (playlist) => {

	//currTrack = loadTrack(playlist, 0)
	loadTrack(playlist, 0).then((currTrack) => {
		console.log(`Ready!`)

		// Assign functionality
		playPause.addEventListener(`click`, event => {
			updatePlayer()
		})
		
		currTrack.addEventListener(`durationchange`, () => {
			updateTimestamp(trackDuration, currTrack.duration)
		})

		// Allow the progress bar to drag without cancelling through update
		currTrack.addEventListener(`timeupdate`, () => {
			const time = updateTimestamp(trackTime, currTrack.currentTime)
			
			if (trackProgress && !draggingProgress) {
				trackProgress.value = time / currTrack.duration
			}
		})

		trackProgress.addEventListener(`input`, event => {
			draggingProgress = true
		})

		trackProgress.addEventListener(`change`, event => {
			draggingProgress = false
			currTrack.currentTime = event.target.value * currTrack.duration
		})
		
	})

	

}