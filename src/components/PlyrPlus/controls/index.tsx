import React, { useRef, useState } from 'react'
import { formatTimeToString, stringTimeToSeconds } from '../utils/helper';
import { VideoChapter } from '@/utils/type/PlyrPlus';
import Seekbar from './Seekbar';


type ControlsProps = {
    videoRef: React.RefObject<HTMLVideoElement>
    chapters?: VideoChapter[]
}

function Controls({ videoRef, chapters }: ControlsProps) {
    const duration = videoRef?.current?.duration || 0;
    const currentTime = videoRef?.current?.currentTime || 0;
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        if (!videoRef?.current) return

        if (videoRef?.current.paused) {
            videoRef?.current.play();
            setIsPlaying(true);
        } else {
            videoRef?.current.pause();
            setIsPlaying(false);
        }
    };


    return (
        <div className="video-controls">
            <Seekbar duration={duration} currentTime={currentTime} videoRef={videoRef} chapters={chapters} />
            {/* <div className="other-controls">
                <button onClick={togglePlayPause}>
                    {isPlaying ? "Pause" : "Play"}
                </button>
                <p>
                    Chapter: {chapters && chapters[currentChapterIndex].chapterName || 0}
                </p>
            </div> */}
        </div>
    )
}

export default Controls