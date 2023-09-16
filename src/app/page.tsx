"use client"
import { useEffect, useRef, useState } from 'react';

import { PlyrPlus } from 'plyrplus';



const chaptersData = [
  {
    index: 0,
    timestamp: "00:00",
    chapterName: "Introduction",
    descripiton: "This is random Description",
  },
  {
    index: 1,
    timestamp: "00:30",
    chapterName: "About Backend",
    descripiton: "This is random Description",
  },
  {
    index: 2,
    timestamp: "01:32",
    chapterName: "Frontend",
    descripiton: "This is random Description",
  },
  {
    index: 3,
    timestamp: "02:40",
    chapterName: "Database",
    descripiton: "This is random Description",
  },
  {
    index: 4,
    timestamp: "03:40",
    chapterName: "Deployment",
    descripiton: "This is random Description",
  },
  {
    index: 5,
    timestamp: "04:50",
    chapterName: "Monitoring",
    descripiton: "This is random Description",
  },
  {
    index: 6,
    timestamp: "06:40",
    chapterName: "THE PROJECT",
    descripiton: "This is random Description",
  },
];

export default function Home() {

  const urlInputRef = useRef<HTMLInputElement>(null)
  const allChaptersRef = useRef<HTMLTextAreaElement>(null)


  const source = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

  const source4 = "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8";

  const [sourceURL, setSourceURL] = useState(source);

  const [shouldPlay, setShouldPlay] = useState(false);
  const [allChapters, setAllChapters] = useState(chaptersData)

  useEffect(() => {
    setShouldPlay(true)
  }, [shouldPlay])

  return (
    <main className="">
      <div className="flex flex-col  items-center mb-4">
        <h1 className='text_heading_size mt-6 mb-12'>PlyrPlus</h1>
      </div>

      <div className="flex flex-col items-center justify-center">


        {shouldPlay &&
          <PlyrPlus source={sourceURL} chapters={allChapters} style={{
          }} />
        }
      </div>

      <div className="flex flex-col  items-center mt-12">

        <label htmlFor="">Video URL</label>
        <div className="flex gap-4 w-8/12">

          <input defaultValue={sourceURL} type="text" className='input_1' ref={urlInputRef} />
          <button className='btn_1_2' onClick={() => {
            setShouldPlay(false)

            if (urlInputRef?.current?.value) {
              setSourceURL(urlInputRef?.current?.value)
              setTimeout(() => {
                setShouldPlay(true)
              }, 0);
            }
          }}>Play</button>
        </div>
      </div>


      <div className="mt-4 " >
        <div className="flex gap-4 items-center justify-center flex-col">
          <div className="flex flex-col gap-2 w-8/12">

            <p className="text-primary">**Please update chapters according to this format</p>
            <label htmlFor="">Chapters Details</label>
            <textarea className='input_1 min-h-[8rem]' ref={allChaptersRef} defaultValue={JSON.stringify(allChapters)} />
            <div className="">

              <button className='btn_1_2' onClick={() => {
                setShouldPlay(false)

                if (allChaptersRef?.current?.value) {
                  setAllChapters(JSON.parse(allChaptersRef?.current?.value))
                  setTimeout(() => {
                    setShouldPlay(true)
                  }, 0);
                }
              }}>Updates Chapters</button>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}
