import { useEffect, useRef } from "react";
const sounds = {
    click:"/sounds/click.mp3",
    bg:"/sounds/bg-sound.mp3",
    correct:"/sounds/correct.mp3",
    wrong:"/sounds/wrong.mp3",
} as const;


export default function useSound(url: string,loop=false) {
    const soundRef = useRef<HTMLAudioElement>(null);
    //fetch sound
    useEffect(() => {
        if (!soundRef.current) {
            const audio = new Audio(url);
            soundRef.current = audio;
        }
    }, [url]);
    const playSound = () => {
        if (soundRef.current) {
            soundRef.current.currentTime = 0;
            soundRef.current.loop = loop;
            soundRef.current.play();
        }
    }
    const pauseSound = () => {
        if (soundRef.current) {
            soundRef.current.pause();
        }
    }
    return [playSound,pauseSound];
}
export function useClickSound(){
    return useSound(sounds.click);
}

export function useBgSound(){
    return useSound(sounds.bg);
}
export function useCorrectAnswerSound(){
    return useSound(sounds.correct);
}
export function useWrongAnswerSound(){
    return useSound(sounds.wrong);
}
export function useWinSound(){
    return useSound("");
}