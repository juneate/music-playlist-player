import { formatTime } from './utils.js'

const audioPlayer = document.getElementById(`audioPlayer`)
const playPause = document.getElementById(`playPause`)
const playPrev = document.getElementById(`playPrev`)
const playNext = document.getElementById(`playNext`)
const trackTime = document.getElementById(`trackTime`)
const trackDuration = document.getElementById(`trackDuration`)
const trackProgress = document.getElementById(`trackProgress`)

let currTrack = new Audio()
let draggingProgress = false
let indexPlaying = 0

const trackDataToDom = [
	{ id: `trackName`,		data: `name`,		prop: `textContent`,	default: `Unknown Name` },
	{ id: `trackArtist`,	data: `artist`,	prop: `textContent`,	default: `Unknown Artist` },
	{ id: `trackGenre`,		data: `genre`,	prop: `textContent`,	default: `` },
	{ id: `trackText`,		data: `text`,		prop: `textContent`,	default: `` },
	{ id: `trackImage`,		data: `img`,		prop: `src`,					default: `https://craftypixels.com/placeholder-image/400x400/e0e0e0/ffffff&text=Placeholder` },
]



export const updatePlayer = (play = false) => {
	if (currTrack.paused || play) {
		currTrack.play().then(() => {
			console.log(`🎶 ${currTrack.src} is now playing`)
			audioPlayer.classList.add(`playing`)
			if (playPause.dataset.pause) {
				playPause.innerHTML = playPause.dataset.pause
			}
		})
	} else {
		currTrack.pause()
		console.log(`🛑 ${currTrack.src} has been paused`)
		audioPlayer.classList.remove(`playing`)
		if (playPause.dataset.play) {
			playPause.innerHTML = playPause.dataset.play
		}
	}
}

const updateTimestamp = (ele, time) => {
	const adjustedTime = time === Infinity ? 0 : time ?? 0

	if (ele) {
		ele.textContent = formatTime(adjustedTime)
	}

	return adjustedTime
}


export const loadTrack = (tracks, index = 0) => {
	
	const track = tracks[index]
	console.log(`✅ Loading up ${track.src}`)

	indexPlaying = index

	// Loop every property and see if it has a corresponding element	
	trackDataToDom.forEach(t => {
		const ele = document.getElementById(t.id)
		if (ele) {
			ele[t.prop] = track[t.data] ?? t.default
		}
	})

	document.querySelectorAll(`.loaded`).forEach(ele => ele.classList.remove(`loaded`))
	track.ref.classList.add(`loaded`)

	
	return new Promise(resolve => {
		const handleMediaLoaded = event => {
			//const currTrack = event.path[0]
			console.log(`...track is loaded!`, currTrack.duration)

			// Can setup a promise here to use an interval to wait for the time, then resolve once complete

			updateTimestamp(trackDuration, currTrack.duration)
			resolve(currTrack)
		}

		// Are these actually being removed though? Doesn't seem like it
		currTrack.removeEventListener(`canplaythrough`, handleMediaLoaded)

		// Assign the track a new source url
		currTrack.pause()
		currTrack.src = track.src
		currTrack.load()

		if (currTrack.readyState != 4) {
			console.log(`loading...`, currTrack.readyState)
			currTrack.addEventListener(`canplaythrough`, handleMediaLoaded)
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

		if (playPause) {
			// Assign functionality
			playPause.addEventListener(`click`, event => {
				updatePlayer()
			})
		}

		if (playNext) {
			playNext.addEventListener(`click`, event => {
				const nextIndex = ((indexPlaying + 1) > (playlist.length - 1)) ? 0 : indexPlaying + 1
				loadTrack(playlist, nextIndex)
				updatePlayer()
			})
		}

		if (playPrev) {
			playPrev.addEventListener(`click`, event => {
				const prevIndex = ((indexPlaying - 1) < 0) ? playlist.length - 1 : indexPlaying - 1
				loadTrack(playlist, prevIndex)
				updatePlayer()
			})
		}

		if (trackVolume) {
			currTrack.volume = trackVolume.value ?? 1
			trackVolume.addEventListener(`input`, event => {
				currTrack.volume = trackVolume.value
			})
		}

		currTrack.addEventListener(`durationchange`, () => {
			updateTimestamp(trackDuration, currTrack.duration)
		})

		// Allow the progress bar to drag without cancelling through update
		currTrack.addEventListener(`timeupdate`, () => {
			const time = updateTimestamp(trackTime, currTrack.currentTime)
			
			if (trackProgress && !draggingProgress) {
				trackProgress.value = (time / currTrack.duration) || 0
			}
		})

		if (trackProgress) {
			trackProgress.addEventListener(`input`, event => {
				draggingProgress = true
			})

			trackProgress.addEventListener(`change`, event => {
				draggingProgress = false
				currTrack.currentTime = event.target.value * currTrack.duration
			})
		}

		
	})
}