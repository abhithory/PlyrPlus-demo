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



    return (
        <div>
            <div className="video-player">
                <video ref={videoRef} controls>
                    <source src={source} type="video/mp4" />
                </video>
                <Controls videoRef={videoRef} chapters={chapters} />
            </div>

        </div>
    )
}

export default PlyrPlus