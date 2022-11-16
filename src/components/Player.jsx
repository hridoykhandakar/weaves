import { useEffect } from "react";
import { FaPlay, FaPause, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { playAudio } from "../utiles";
const iconStyle = {
  cursor: "pointer",
  fontSize: "30px",
};

function Player({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  setCurrentSong,
  songs,
  setSongs,
}) {
  // useRef
  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
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
    setSongs(newSongs);
  }, [currentSong]);
  // Event handler
  const playSongHandler = () => {
    audioRef.current.volume = 0.05;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  // use state
  const skipTrackHandler = async (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        if (isPlaying) audioRef.current.play();

        setCurrentSong(songs[songs.length - 1]);
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
    // if (isPlaying) audioRef.current.play();
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const showVol = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)} </p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || "0"}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
        </div>
        <p>{getTime(songInfo.duration)} </p>
      </div>
      <div className="play-control">
        <FaAngleLeft
          onClick={() => {
            skipTrackHandler("skip-back");
          }}
          className="skip-back"
          style={iconStyle}
        />
        <div className="btn" onClick={playSongHandler}>
          {isPlaying ? (
            <FaPause style={iconStyle} />
          ) : (
            <FaPlay style={iconStyle} />
          )}
          {/* <FaPlay style={iconStyle} /> */}
        </div>
        <FaAngleRight
          onClick={() => {
            skipTrackHandler("skip-forward");
          }}
          className="skip-forward"
          style={iconStyle}
        />
      </div>
    </div>
  );
}

export default Player;
