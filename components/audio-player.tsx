import { forwardRef, ReactEventHandler } from 'react'
import { Song } from '../types'

type AudioPlayerProps = {
  currentSong: Song
  handleSeeking: ReactEventHandler<HTMLAudioElement>
}

export const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(
  ({ currentSong, handleSeeking }, ref) => {
    return (
      <figure>
        <figcaption>Listen &quot;{currentSong.name}&quot;</figcaption>
        <audio
          ref={ref}
          controls
          src={`https://cdn.bensound.com/bensound-${currentSong.id}.mp3`}
          id={currentSong.id}
          onSeeking={handleSeeking}
        >
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </figure>
    )
  }
)

AudioPlayer.displayName = 'AudioPlayer'
