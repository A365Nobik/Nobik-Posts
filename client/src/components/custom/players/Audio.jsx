import { FaPlay } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

export default function Audio({ audio }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const name = audio.name.split(".")[0];
  const [audioLength, setAudioLength] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    const audio = audioRef.current;
    const timeUpdateHandler = (event) => {
      setCurrentTime(event.srcElement.currentTime);
    };
    if (isPlaying && audio) {
      audio.addEventListener("timeupdate", timeUpdateHandler);
    }
    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", timeUpdateHandler);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.addEventListener("loadedmetadata", () => {
        setAudioLength((audio / 60).slice(0, 3));
      });
    }
  }, []);

  const audioPlay = () => {
    setCurrentTime(audioRef?.current?.currentTime);
    console.log(currentTime);
    setIsPlaying(!isPlaying);
  };

  const volumeChange = (event) => {
    const value = event.target.value;
    audioRef.current.volume = value;
  };

  const durationChange = (event) => {
    const value = event.target.value;
    audioRef.current.currentTime = value;
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[var(--bg-secondary)] rounded-lg w-120 h-75 relative">
      <audio
        autoPlay={isPlaying}
        ref={audioRef}
        hidden
        src={URL.createObjectURL(audio)}
        className="w-full h-full object-contain rounded"
      />
      <div className=" rotate-270 absolute left-0 -translate-x-1/4 top-1/2 -translate-y-1/2 ">
        <input
          onChange={(event) => volumeChange(event)}
          type="range"
          min={0}
          max={1}
          step={0.01}
        />
      </div>
      <div className="flex justify-center items-center  rounded-full bg-[var(--bg-primary)] w-50 h-50 relative ">
        <div className="flex justify-center items-center rounded-full bg-[var(--bg-secondary)] w-25 h-25 absolute top-1/2 -translate-y-1/2  transition-transform duration-600">
          <p className="text-sm  absolute top-1/2 -translate-y-1/2">{name}</p>
        </div>
      </div>
      <h1>{name}</h1>
      <button onClick={audioPlay}>
        <FaPlay className="text-2xl" />
      </button>
      <div className="flex justify-center items-center">
        <p>{currentTime}</p>
        <input
          className=""
          value={currentTime}
          onChange={(event) => durationChange(event)}
          type="range"
          min={0}
          max={audioRef?.current?.duration}
          step={1}
        />
        <p>{audioLength}</p>
      </div>
    </div>
  );
}
