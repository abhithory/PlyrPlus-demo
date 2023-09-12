"use client"
import { VideoChapter } from '@/utils/type/PlyrPlus';
import Seekbar from './Seekbar';
import { useState } from 'react';


type ControlsProps = {
    videoRef: React.RefObject<HTMLVideoElement>
    chapters?: VideoChapter[];
    currentTime: number;
    setCurrentTime: (newTime: number) => void;
    isControlsVisible: boolean;
}

function Controls({ videoRef, chapters, currentTime, setCurrentTime, isControlsVisible }: ControlsProps) {
    const duration = videoRef?.current?.duration || 0;

    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);


    return (
        <>
            <div className={`plyrPlus__currentchapter_container ${!isControlsVisible && "hidden"}`}>
                <div className="">
                    <p>
                        {">"} {chapters && chapters[currentChapterIndex].chapterName}</p>
                </div>
            </div>
            <div className={`video-controls ${!isControlsVisible && "hidden"}`}>
                <Seekbar duration={duration} currentTime={currentTime} videoRef={videoRef} chapters={chapters} setCurrentTime={setCurrentTime} setCurrentChapterIndex={setCurrentChapterIndex} />
            </div>
        </>
    )
}

export default Controls