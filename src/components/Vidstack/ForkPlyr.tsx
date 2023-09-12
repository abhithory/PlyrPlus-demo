"use client"
import React, { useEffect, useRef, useState } from "react";
import Hls from 'hls.js';
import { VideoChapter } from '@/utils/type/PlyrPlus';
import { MediaCommunitySkin, MediaOutlet, MediaPlayer, MediaPoster } from '@vidstack/react';




type PlayerPlusProps = {
    source: string;
    chapters?: VideoChapter[]
}

export default function ForkVideoPlyr({ source, chapters }: PlayerPlusProps) {

    return (
        <MediaPlayer
            title="Sprite Fight"
            src={source}
            // src="https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/low.mp4"
            poster="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=980"
            thumbnails="https://media-files.vidstack.io/sprite-fight/thumbnails.vtt"
            aspectRatio={16 / 9}
            crossorigin=""
        >
            <MediaOutlet>
                <MediaPoster
                    alt="Girl walks into sprite gnomes around her friend on a campfire in danger!"
                />
                <track
                    src="https://media-files.vidstack.io/sprite-fight/subs/english.vtt"
                    label="English"
                    srcLang="en-US"
                    kind="subtitles"
                    default
                />
                <track
                    src="https://media-files.vidstack.io/sprite-fight/chapters.vtt"
                    srcLang="en-US"
                    kind="chapters"
                    default
                />
            </MediaOutlet>
            <MediaCommunitySkin />
        </MediaPlayer>

    )
}

