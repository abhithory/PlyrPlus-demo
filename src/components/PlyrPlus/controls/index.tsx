import React, { useRef, useState } from 'react'
import { formatTimeToString, stringTimeToSeconds } from '../utils/helper';
import { VideoChapter } from '@/utils/type/PlyrPlus';
import Seekbar from './Seekbar';


type ControlsProps = {
    videoRef: React.RefObject<HTMLVideoElement>
    chapters?: VideoChapter[];
    currentTime: number;
    setCurrentTime: (newTime: number) => void;
}

function Controls({ videoRef, chapters, currentTime, setCurrentTime }: ControlsProps) {
    const duration = videoRef?.current?.duration || 0;

    return (
        <div className="video-controls">
            <Seekbar duration={duration} currentTime={currentTime} videoRef={videoRef} chapters={chapters} setCurrentTime={setCurrentTime} />
        </div>
    )
}

export default Controls