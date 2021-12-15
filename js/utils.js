export const formatTime = (time) => {
  return `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, `0`)}`
}
