"use client"
import React, { useEffect, useRef, useState } from "react";
import { VideoChapter } from '@/utils/type/PlyrPlus';

type PlayerPlusProps = {
    source: string;
    chapters?: VideoChapter[]
}

function PlyrPlus({ source, chapters }: PlayerPlusProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const duration = videoRef?.current?.duration || 0;
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

    const isDraggingRef = useRef(false); // Use a ref for dragging state

    const maxChapterIndex = chapters?.length && chapters.length - 1 || 0;



    const handleTimeUpdate = () => {
        setCurrentTime(videoRef?.current?.currentTime || 0);
    };

    const handleSeek = (e: any) => {
        if (!videoRef.current) return

        const seekBar = e.currentTarget;
        const boundingRect = seekBar.getBoundingClientRect();
        const offsetX = e.clientX - boundingRect.left;
        const clickX = offsetX / boundingRect.width;
        const newTime = clickX * duration;
        videoRef.current.currentTime = newTime;

        const index = getChapterIndexFromSecounds(newTime);

        setCurrentChapterIndex(index >= 0 ? index : 0);
    };

    const goToTimeStamp = (timestamp: string) => {
        if (!videoRef.current) return
        const timeInSecounds = timeToSeconds(timestamp);
        videoRef.current.currentTime = timeInSecounds;
        const index = getChapterIndexFromSecounds(timeInSecounds);
        setCurrentChapterIndex(index >= 0 ? index : 0);
    };


    const handleSeekMouseDown = () => {
        isDraggingRef.current = true;
        document.addEventListener("mouseup", handleSeekMouseUp);
        document.addEventListener("mousemove", handleSeekMouseMove);
    };
    const handleSeekMouseUp = () => {
        isDraggingRef.current = false;
        document.removeEventListener("mousemove", handleSeekMouseMove);
        document.removeEventListener("mouseup", handleSeekMouseUp);
    };

    const handleSeekMouseMove = (e: any) => {
        if (!videoRef.current) return
        handleSeekHover(e)
        if (!isDraggingRef.current) return;
        const seekBarElement = document.getElementById("seekbar_container");
        if (!seekBarElement) return
        const boundingRect = seekBarElement.getBoundingClientRect();
        const offsetX = e.clientX - boundingRect.left;
        const clickX = offsetX / boundingRect.width;
        const newTime = clickX * duration;
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime); // Update the current time in real-time
    };

    const togglePlayPause = () => {
        if (!videoRef.current) return

        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    function timeToSeconds(timeString: string) {
        const [minutes, seconds] = timeString.split(":").map(Number);
        return minutes * 60 + seconds;
    }

    const getChapeterLengthPercent = (index: number) => {
        if (!chapters) return 0

        const thisChapterStartingSecounds = timeToSeconds(
            chapters[index].timestamp
        );

        let nextChapterStartingSecounds =
            index >= maxChapterIndex
                ? duration
                : timeToSeconds(chapters[index + 1].timestamp);
        const thisChapterDuration =
            nextChapterStartingSecounds - thisChapterStartingSecounds;

        return (thisChapterDuration / duration) * 100;
    };

    const getProgressChapterWidth = (index: number) => {
        if (!chapters) return 0
        const thisChapterStartingSecounds = timeToSeconds(
            chapters[index].timestamp
        );
        let nextChapterStartingSecounds =
            index >= maxChapterIndex
                ? duration
                : timeToSeconds(chapters[index + 1].timestamp);
        const thisChapterDuration =
            nextChapterStartingSecounds - thisChapterStartingSecounds;
        const sectionCurrentWidth = currentTime - thisChapterStartingSecounds;
        const width = (sectionCurrentWidth / thisChapterDuration) * 100;

        return width > 0 ? (width < 100 ? width : 100) : 0;
    };


    const getChapterIndexFromSecounds = (seconds: number) => {
        if (!chapters) return -1

        for (let i = 0; i <= maxChapterIndex; i++) {
            const thisChapterStartingSecounds = timeToSeconds(
                chapters[i].timestamp
            );

            let nextChapterStartingSecounds =
                i >= maxChapterIndex
                    ? duration
                    : timeToSeconds(chapters[i + 1].timestamp);

            if (
                seconds > thisChapterStartingSecounds &&
                seconds <= nextChapterStartingSecounds
            ) {
                return i;
            }
        }
        return -1;
    };

    const handleSeekHover = (e: any) => {
        const seekBarElement = document.getElementById("seekbar_container");
        if (!seekBarElement) return
        const boundingRect = seekBarElement.getBoundingClientRect();
        const offsetX = e.clientX - boundingRect.left;
        const clickX = offsetX / boundingRect.width;
        const newTime = clickX * duration;
        const formattedTime = formatTime(newTime); // Implement the formatTime function
        const hoverTimeIndicator: HTMLElement | null = document.querySelector(".hover-time-indicator");
        if (!hoverTimeIndicator) return
        const timeSpan: HTMLElement | null = hoverTimeIndicator?.querySelector("#timespan");
        const titleSpan: HTMLElement | null = hoverTimeIndicator?.querySelector("#titlespan");

        if (timeSpan) {
            timeSpan.textContent = formattedTime;
        }
        if (chapters && titleSpan) {
            const _index = getChapterIndexFromSecounds(newTime);
            const currentTitle = chapters[_index >= 0 ? _index : 0].chapterName;
            titleSpan.textContent = currentTitle;
        }


        // Calculate the position to display the time indicator above the cursor
        const indicatorWidth = hoverTimeIndicator.offsetWidth;
        const leftPosition = offsetX - indicatorWidth / 2;
        hoverTimeIndicator.style.left = `${leftPosition}px`;
    };

    const formatTime = (timeInSeconds: number) => {
        // Convert timeInSeconds to your desired format (e.g., 0:00)
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };




    const handleSeekHoverEnter = () => {
        const hoverTimeIndicator: HTMLElement | null = document.querySelector(".hover-time-indicator");
        if (!hoverTimeIndicator) return
        hoverTimeIndicator.style.display = "flex";
    };

    const handleSeekHoverLeave = () => {
        const hoverTimeIndicator: HTMLElement | null = document.querySelector(".hover-time-indicator");
        if (!hoverTimeIndicator) return
        hoverTimeIndicator.style.display = "none";
    };



    return (
        <div>
            <div className="video-player">
                <video ref={videoRef} controls onTimeUpdate={handleTimeUpdate}>
                    <source src={source} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="video-controls">
                    <div
                        className="seekbar-container"
                        id="seekbar_container"
                        onClick={handleSeek}
                        onMouseDown={handleSeekMouseDown}
                        onMouseMove={handleSeekMouseMove}
                        onMouseUp={handleSeekMouseUp}
                        onMouseEnter={handleSeekHoverEnter}
                        onMouseLeave={handleSeekHoverLeave}

                    >
                        <div className="hover-time-indicator">
                            <span id="titlespan">{chapters && chapters[0].chapterName}</span>
                            <span id="timespan">0:00</span>
                        </div>

                        {chapters?.map((item) => {
                            const chapterPercent = getChapeterLengthPercent(item.index);
                            console.log("chapterPercent", chapterPercent);
                            return (
                                <div
                                    className="seekbar-section"
                                    style={{ width: `${chapterPercent}%` }}
                                    key={item.index}
                                >
                                    <div
                                        className="seekbar-progress"
                                        style={{ width: `${getProgressChapterWidth(item.index)}%` }}
                                    >
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="other-controls">
                        <button onClick={togglePlayPause}>
                            {isPlaying ? "Pause" : "Play"}
                        </button>
                        <p>
                            Chapter: {chapters && chapters[currentChapterIndex].chapterName || 0}
                        </p>
                    </div>
                </div>
            </div>
            <div className="chapterSection">
                <div className="all-chapaterDetails">
                    {chapters && chapters.map((item, key) => {
                        return (
                            <div className="one-chapter" key={key}>
                                <p>
                                    {item.index + 1}: {item.chapterName}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        goToTimeStamp(item.timestamp);
                                    }}
                                >
                                    {item.timestamp}
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className="current-chapaterDetails">
                    <h1>Current ChapterDetails: </h1>
                    <h3>Title: {chapters && chapters[currentChapterIndex].chapterName}</h3>
                    <p>
                        Descripiton: {chapters && chapters[currentChapterIndex].descripiton}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PlyrPlus