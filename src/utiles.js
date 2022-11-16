// export const playAudio = (isPlaying, audioRef) => {
//   if (isPlaying) {
//     audioRef.current.pause();
//     setIsPlaying(!isPlaying);
//   } else {
//     audioRef.current.play();
//     setIsPlaying(!isPlaying);
//   }
// };
export const playAudio = (isPlaying, audioRef) => {
  if (isPlaying) {
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then((audio) => {
        audioRef.current.play();
      });
    }
  }
};
