import { Dispatch, RefObject, SetStateAction } from 'react'
import { songs } from '../data'
import { Song } from '../types'

type AudioControlsProps = {
  audioRef: RefObject<HTMLAudioElement>
  currentSong: Song
  setCurrentSong: Dispatch<SetStateAction<Song>>
}

export const AudioControls = ({
  audioRef,
  currentSong,
  setCurrentSong,
}: AudioControlsProps) => {
  const handleNextSong = () => {
    const nextSongIndex = songs.indexOf(currentSong) + 1
    const nextSong = songs?.[nextSongIndex] ?? songs[0]
    setCurrentSong(nextSong)
  }

  const handleLike = () => {
    console.log(`You liked "${currentSong.name}" song`)
  }

  const handlePass = () => {
    console.log(`You passed "${currentSong.name}" song`)
    handleNextSong()
  }

  const handlePauseAndPlay = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }
  }

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
    }
  }

  const handleSkip = () => {
    console.log(`You skipped "${currentSong.name}" song`)
    handleNextSong()
  }

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10
    }
  }

  const handleFastForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10
    }
  }

  const handleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !audioRef.current.loop || true
    }

    console.log('Loop')
  }
  const handleSeek = () => {
    console.log('Seek')
  }
  const handleTags = () => {
    console.log(`You tagged "${currentSong.name}" song`)
  }
  const handleComment = () => {
    console.log(`You commented "${currentSong.name}" song`)
  }

  return (
    <div>
      <button onClick={handleLike}>Like</button>
      <button onClick={handlePass}>Pass</button>
      <button onClick={handlePauseAndPlay}>Play / Pause</button>
      <button onClick={handleRestart}>Back to beginning of song</button>
      <button onClick={handleSkip}>Skip song</button>
      <button onClick={handleRewind}>Rewind 10 seconds</button>
      <button onClick={handleFastForward}>Fast forward 10 seconds</button>
      <button onClick={handleLoop}>
        Loop (by default suggests a loop of time specified by user)
      </button>
      <button onClick={handleSeek}>Seek</button>
      <button onClick={handleTags}>Tags</button>
      <button onClick={handleComment}>Comment</button>
    </div>
  )
}
