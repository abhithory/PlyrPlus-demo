import ForkVideoPlyr from '@/components/Forking/ForkPlyr';
import PlyrPlus from '@/components/PlyrPlus/PlyrPlus'
import { VideoChapter } from '@/utils/type/PlyrPlus';
import Image from 'next/image'



const chaptersData: VideoChapter[] = [
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


  const source = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  const source2 = "https://edge.mhq.12core.net/577a146148b5fabf20eea2cf2ab8659b.m3u8"

  const source3 = "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"

  const source4 = "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8";


  const source5 = "https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/low.mp4";
  return (
    <main className="">
      <h1>PlyrPlus</h1>
      <PlyrPlus source={source} chapters={chaptersData} />

      {/* <h1>Fork Plyr</h1>
      <ForkVideoPlyr source={source5} chapters={chaptersData} /> */}

    </main>
  )
}
