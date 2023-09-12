import { VideoChapter } from '@/utils/type/PlyrPlus';
import React, { useRef, useState } from 'react'
import { formatTimeToString, stringTimeToSeconds } from '../utils/helper';

type ControlsProps = {
    videoRef: React.RefObject<HTMLVideoElement>
    chapters?: VideoChapter[],
    duration: number;
    currentTime: number;
}

function Seekbar({ videoRef, chapters, duration, currentTime }: ControlsProps) {

    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const isDraggingRef = useRef(false); // Use a ref for dragging state
    const maxChapterIndex = chapters?.length && chapters.length - 1 || 0;




    const handleSeek = (e: any) => {
        if (!videoRef?.current) return
        const seekBar = e.currentTarget;
        const boundingRect = seekBar.getBoundingClientRect();
        const offsetX = e.clientX - boundingRect.left;
        const clickX = offsetX / boundingRect.width;
        const newTime = clickX * duration;
        videoRef.current.currentTime = newTime;

        const index = getChapterIndexFromSecounds(newTime);

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
        if (!videoRef?.current) return
        handleSeekHover(e)
        if (!isDraggingRef.current) return;
        const seekBarElement = document.getElementById("seekbar_container");
        if (!seekBarElement) return
        const boundingRect = seekBarElement.getBoundingClientRect();
        const offsetX = e.clientX - boundingRect.left;
        const clickX = offsetX / boundingRect.width;
        const newTime = clickX * duration;
        videoRef.current.currentTime = newTime;
        // setCurrentTime(newTime); // Update the current time in real-time
    };

    const handleSeekHover = (e: any) => {
        const seekBarElement = document.getElementById("seekbar_container");
        if (!seekBarElement) return
        const boundingRect = seekBarElement.getBoundingClientRect();
        const offsetX = e.clientX - boundingRect.left;
        const clickX = offsetX / boundingRect.width;
        const newTime = clickX * duration;
        const formattedTime = formatTimeToString(newTime); // Implement the formatTime function
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







    const getChapeterLengthPercent = (index: number) => {
        if (!chapters) return 0

        const thisChapterStartingSecounds = stringTimeToSeconds(
            chapters[index].timestamp
        );

        let nextChapterStartingSecounds =
            index >= maxChapterIndex
                ? duration
                : stringTimeToSeconds(chapters[index + 1].timestamp);
        const thisChapterDuration =
            nextChapterStartingSecounds - thisChapterStartingSecounds;

        return (thisChapterDuration / duration) * 100;
    };

    const getProgressChapterWidth = (index: number) => {
        if (!chapters) return 0
        const thisChapterStartingSecounds = stringTimeToSeconds(
            chapters[index].timestamp
        );
        let nextChapterStartingSecounds =
            index >= maxChapterIndex
                ? duration
                : stringTimeToSeconds(chapters[index + 1].timestamp);
        const thisChapterDuration =
            nextChapterStartingSecounds - thisChapterStartingSecounds;
        const sectionCurrentWidth = currentTime - thisChapterStartingSecounds;
        const width = (sectionCurrentWidth / thisChapterDuration) * 100;

        return width > 0 ? (width < 100 ? width : 100) : 0;
    };


    const getChapterIndexFromSecounds = (seconds: number) => {
        if (!chapters) return -1

        for (let i = 0; i <= maxChapterIndex; i++) {
            const thisChapterStartingSecounds = stringTimeToSeconds(
                chapters[i].timestamp
            );

            let nextChapterStartingSecounds =
                i >= maxChapterIndex
                    ? duration
                    : stringTimeToSeconds(chapters[i + 1].timestamp);

            if (
                seconds > thisChapterStartingSecounds &&
                seconds <= nextChapterStartingSecounds
            ) {
                return i;
            }
        }
        return -1;
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
    )
}

export default Seekbar