import { createContext, useContext } from "react";
import type { sounds } from "../lib/constant";

type SoundsMap = typeof sounds;

export const SoundContext = createContext<{
  playSound: (sound: keyof SoundsMap) => void;
  pauseSound: (sound: keyof SoundsMap) => void;
}>({
  playSound: () => {},
  pauseSound: () => {},
});

export const useSoundContext = () => useContext(SoundContext);
