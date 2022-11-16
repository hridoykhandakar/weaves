import { playAudio } from "../utiles";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const handleClick = async () => {
    const id = song.id;
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    await setSongs(newSongs);

    await setCurrentSong(song);
    if (isPlaying) audioRef.current.play();

    // playAudio(isPlaying, audioRef);

    // if (isPlaying) {
    //   const playPromise = audioRef.current.play();
    //   if (playPromise !== undefined) {
    //     playPromise.then((audio) => {
    //       audioRef.current.play();
    //     });
    //   }
    // }
    // playAudio(audioRef, isPlaying);
    // audioRef.current.play();
  };
  return (
    <div
      onClick={handleClick}
      className={`library-song ${song.active ? "selected" : ""} `}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};
export default LibrarySong;
