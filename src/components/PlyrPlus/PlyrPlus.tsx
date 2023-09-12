"use client"
import React, { useEffect, useRef, useState } from "react";
import { VideoChapter } from '@/utils/type/PlyrPlus';

import Hls from 'hls.js';
import Controls from "./controls";


type PlayerPlusProps = {
    source: string;
    chapters?: VideoChapter[]
}

function PlyrPlus({ source, chapters }: PlayerPlusProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentTime, setCurrentTime] = useState(videoRef?.current?.currentTime || 0)




    // useEffect(() => {
    //     if (!videoRef.current) return
    //     setCurrentVideo(videoRef.current);
    //     if (Hls.isSupported() && source.endsWith("m3u8")) {
    //         const hls = new Hls();
    //         hls.loadSource(source);
    //         hls.attachMedia(videoRef.current);
    //     } else {
    //         // videoRef.current.src = source;
    //     }
    //     return () => {

    //     };
    // }, [videoRef]);


    const handleTimeUpdate = () => {

        console.log("updating......");

        setCurrentTime(videoRef?.current?.currentTime || 0);
    };

    return (
        <div>
            <div className="video-player">
                <video ref={videoRef} controls onTimeUpdate={handleTimeUpdate}>
                    <source src={source} type="video/mp4" />
                </video>
                <Controls videoRef={videoRef} currentTime={currentTime} chapters={chapters} setCurrentTime={setCurrentTime} />
            </div>

        </div>
    )
}

export default PlyrPlus