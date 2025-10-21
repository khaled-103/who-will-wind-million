import { useRef } from "react";
import { sounds } from "../../lib/constant";
import { SoundContext } from "../../contexts/SoundContext";
import { Outlet } from "react-router";
type SoundsMap = typeof sounds;
export const SoundContextProvider = () => {
  const audioRefs = useRef<Record<keyof SoundsMap, HTMLAudioElement>>({} as Record<keyof SoundsMap, HTMLAudioElement>);
  Object.keys(sounds).forEach((key) => {
    if (!audioRefs.current[key as keyof SoundsMap]) {
      const {path,loop} = sounds[key as keyof SoundsMap];
      const audio = new Audio(path);
      audio.loop = loop;
      audioRefs.current[key as keyof SoundsMap] = audio;
    }
  });

  const playSound = (sound: keyof SoundsMap) => {
    const audio = audioRefs.current[sound];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  const pauseSound = (sound: keyof SoundsMap) => {
    audioRefs.current[sound]?.pause();
  };

  return (
    <SoundContext value={{ playSound, pauseSound }}>
      <Outlet/>
    </SoundContext>
  );
};

