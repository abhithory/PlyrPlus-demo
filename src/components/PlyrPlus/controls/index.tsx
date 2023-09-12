import { VideoChapter } from '@/utils/type/PlyrPlus';
import Seekbar from './Seekbar';


type ControlsProps = {
    videoRef: React.RefObject<HTMLVideoElement>
    chapters?: VideoChapter[];
    currentTime: number;
    setCurrentTime: (newTime: number) => void;
    isControlsVisible: boolean;
}

function Controls({ videoRef, chapters, currentTime, setCurrentTime, isControlsVisible }: ControlsProps) {
    const duration = videoRef?.current?.duration || 0;

    return (
        <div className={`video-controls ${!isControlsVisible && "hidden"}`}>

            <Seekbar duration={duration} currentTime={currentTime} videoRef={videoRef} chapters={chapters} setCurrentTime={setCurrentTime} />
        </div>
    )
}

export default Controls