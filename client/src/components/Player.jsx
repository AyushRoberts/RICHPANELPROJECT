import React from "react";
import ReactPlayer from "react-player";
const Player = ({ url, setPlayer }) => {
  return (
    <div className="playermaincont">
      <ReactPlayer controls playing width={"100vw"} url={url} />
      <button className="submit" onClick={() => setPlayer(false)}>
        BACK
      </button>
    </div>
  );
};

export default Player;
