

export function getRandomFromArray<T>(arr: T[], count: number){
    const randomIndexes = new Set<number>();
    while (randomIndexes.size < count) {
      randomIndexes.add(Math.floor(Math.random() * arr.length));
    }
    return Array.from(randomIndexes).map((index) => arr[index]);
};

export const handleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

