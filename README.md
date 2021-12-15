# Interactive Audio Player

Build the interface for an audio player, then follow the instructions below to get the player working with a custom JavaScript library.

## Setup

1. As the last element within the `<head>`, add the following line to attach the JavaScript library: 
      ```html
      <script src="https://juneate.github.io/music-playlist-player/js/script.js" type="module" defer></script>
      ```
2. If you do not have tracks prepared, here are the urls of 10 randomly selected royalty free songs you may use:
   ```
   https://cdn.pixabay.com/audio/2021/11/13/audio_cb4f1212a9.mp3
   https://cdn.pixabay.com/audio/2021/11/24/audio_82498b22da.mp3
   https://cdn.pixabay.com/audio/2021/11/25/audio_91b32e02f9.mp3
   https://cdn.pixabay.com/audio/2021/11/23/audio_035a943c87.mp3
   https://cdn.pixabay.com/audio/2021/11/01/audio_00fa5593f3.mp3
   https://cdn.pixabay.com/audio/2021/08/08/audio_dc39bde808.mp3
   https://cdn.pixabay.com/audio/2021/07/27/audio_202082aa0b.mp3
   https://cdn.pixabay.com/audio/2021/07/22/audio_9584aae297.mp3
   https://cdn.pixabay.com/audio/2020/10/11/audio_746c5a0fb3.mp3
   https://cdn.pixabay.com/audio/2021/12/11/audio_0ad0f9e437.mp3
   ```


## Major Components

1. Add `id="audioPlayer"` to the parent element holding the audio controls
   - When the track is playing, a class of `playing` will be added to this element to allow you to style the control element itself, as well as its inner elements
2. Add `id="audioPlaylist"` to the parent element that's direclty holding the tracks
   - When a track is playing the class of `loaded` will be added to the song element to allow you to style the song as "playing", as well as its inner elements

### Example styling
```css
/* Styles applied to the player itself */
#audioPlayer.playing {
   
}

/* Styles applied to an element within the player that has a class of `play-btn` applied */
#audioPlayer.playing .play-btn {
   
}
```

## Controls

All of the following controls are optional, but will provide functionality if present

1. Add `id="playPause"` to a element to play and pause the song
   - To have dynamic content within the element for play/pause, add attributes:
      - `data-play`: The text to show in the element to play a song
      - `data-pause`: The text to show in the element to pause a song
2. Add `id="playNext"` and/or `id="playPrev"` to elements to advance to the next track
   - Will loop back to the beginning or end of the list if trying to advance back/forward past the list first/last songs
3. Add `id="trackTime"` to an element will load it with the amount of time in the song that's elapsed
4. Add `id="trackDuration"` to an element to show the total length of the song
5. Add a range slider with the following attribute (at least), to allow for showing/updating progress: `<input type="range" id="trackProgress" min="0" max="1" step="0.001" value="0">`
6. Add a range slider with the following attribute (at least), to allow for updating the song volume: `<input type="range" id="trackVolume" min="0" max="1" step="0.01" value="0.5">`

## Song Metadata

For each element representing a "track", add any of the following custom data attributes to be able to display when the song is loaded into the player
- `data-src`: Music file url **(required)**
- `data-name`: Track name
- `data-artist`: Artist name
- `data-genre`: Song genre
- `data-text`: Misc text (description, lyrics, etc)
- `data-img`: Image file url

The following describes the requirements to accommodate each of the data attributes above for output (default values will be set for songs that are missing any data):
- Add `id="trackName"` to the element which will show the current track's `data-name` value
- Add `id="trackArtist"` to the element which will show the current track's `data-artist` value
- Add `id="trackGenre"` to the element which will show the current track's `data-genre` value
- Add `id="trackText"` to the element which will show the current track's `data-text` value
- To accommodate track art, add an image with the following attributes and id: `<img src="" alt="Track art" id="trackImage">`

