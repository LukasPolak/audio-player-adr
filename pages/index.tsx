import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { AudioControls } from '../components/audio-controls'
import { AudioPlayer } from '../components/audio-player'
import { songs } from '../data'
import { formatTime } from '../utils'

const Home: NextPage = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [loopStartTime, setLoopStartTime] = useState(0)
  const [loopEndTime, setLoopEndTime] = useState(5)

  const handleSeeking = () => {
    const audioElement = audioRef.current
    const duration = audioElement?.duration ?? 0
    const currentTime = Math.floor(audioElement?.currentTime ?? 0)

    if (audioElement) {
      if (Math.floor(duration) === currentTime) {
        setLoopStartTime(currentTime - 5)
        setLoopEndTime(currentTime)
      } else {
        setLoopStartTime(currentTime)
        setLoopEndTime(currentTime + 5)
      }
    }
  }

  useEffect(() => {
    const audioElement = audioRef.current

    const interval = setInterval(() => {
      if (audioElement && audioElement.currentTime >= loopEndTime) {
        audioElement.currentTime = loopStartTime
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [audioRef, loopEndTime, loopStartTime])

  return (
    <main>
      <dl>
        <dt>loopStartTime</dt>
        <dt>{formatTime(loopStartTime)}</dt>
        <dt>loopEndTime</dt>
        <dt>{formatTime(loopEndTime)}</dt>
      </dl>
      <AudioPlayer
        ref={audioRef}
        currentSong={currentSong}
        handleSeeking={handleSeeking}
      />
      <AudioControls
        audioRef={audioRef}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
    </main>
  )
}

export default Home
