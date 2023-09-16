"use client"
import React, { useEffect, useRef, useState } from "react";
import { VideoChapter } from '@/utils/type/PlyrPlus';

import Hls from 'hls.js';
import Controls from "./controls";
import { IsInMobile } from "./utils/helper";


type PlayerPlusProps = {
    source: string;
    chapters?: VideoChapter[]
}

function PlyrPlus({ source, chapters }: PlayerPlusProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);
    const [currentTime, setCurrentTime] = useState(videoRef?.current?.currentTime || 0)
    const [isControlsVisible, setIsControlsVisible] = useState(true);


    useEffect(() => {
        if (!videoRef.current) return
        if (Hls.isSupported() && source.endsWith("m3u8")) {
            const hls = new Hls();
            hls.loadSource(source);

            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                const availableQualities = data.levels.map((level) => {
                    return {
                        bitrate: level.bitrate,
                        resolution: level.width + 'x' + level.height,
                        url: level.url,
                    };
                });
                console.log("availableQualities", availableQualities);
            });
            hls.attachMedia(videoRef.current);
        } else {
            videoRef.current.src = source;
        }
    }, []);




    const onMouseEnterInContainer = () => {
        setIsControlsVisible(true);
    };

    const onMouseLeaveInContainer = () => {
        if (!videoRef?.current?.paused) {
            setIsControlsVisible(false);
        }
    }

    let clickTimeOut: any;
    const onTouchEndInContainer = () => {
        clearTimeout(clickTimeOut);
        clickTimeOut = setTimeout(() => {
            if (!videoRef?.current?.paused) {
                setIsControlsVisible(false);
            }

        }, 3000);
    }


    const handleVideoLoaded = () => {
        setIsVideoLoaded(true);
    };
    const handleBufferStart = () => {
        setIsBuffering(true);
    };

    const handleBufferEnd = () => {
        setIsBuffering(false);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(videoRef?.current?.currentTime || 0);
    };




    return (
        <div>
            <div className="plyrPlus__container"
                ref={videoContainerRef}
                onTouchStart={onMouseEnterInContainer}
                onMouseEnter={onMouseEnterInContainer}

                onMouseLeave={onMouseLeaveInContainer}
                onTouchMove={onMouseEnterInContainer}
                onTouchEnd={onTouchEndInContainer}
            >
                <video ref={videoRef}
                    onTimeUpdate={handleTimeUpdate}
                    onWaiting={handleBufferStart}
                    onCanPlay={handleBufferEnd}
                    onLoadedMetadata={handleVideoLoaded}
                    controls
                    controlsList="nodownload"
                    onTouchStart={onMouseEnterInContainer}
                    onPlay={() => {
                        if (IsInMobile()) {
                            onMouseLeaveInContainer()
                        }
                    }}
                >
                    <source src={source} type="video/mp4" />
                </video>
                <Controls videoRef={videoRef} currentTime={currentTime} chapters={chapters} setCurrentTime={setCurrentTime} isControlsVisible={isControlsVisible} />
                {isBuffering &&
                    <span className="plyrPlus__buffering_container">
                        <span className="plyrPlus__loader"></span>
                    </span>
                }
            </div>
        </div>
    )
}

export default PlyrPlus