import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Player from "./Player";

const Files = ({ setFile }) => {
  const [fileList, setFileList] = useState();
  const [player, setPlayer] = useState(false);
  const [name, setName] = useState();
  const getFiles = async () => {
    const files = await axios.get("http://16.171.35.127:3000/files");
    console.log(files);
    setFileList(files.data);
  };
  useEffect(() => {
    getFiles();
  }, []);
  const deleteVid = async (name) => {
    axios.post(`http://16.171.35.127:3000/delete?vid=${name}`).then(getFiles());
  };
  return (
    <>
      {player && <Player setPlayer={setPlayer} url={name} />}
      <div className="box uploadedvidlist">
        {fileList?.length > 1
          ? fileList.map((e, i) => {
              if (e.indexOf(".mp4") != -1)
                return (
                  <div
                    className="uploadedvidlistitem"
                    key={i}

                    // to={`?${e}`}
                  >
                    <div
                      className="uploadedvidlistitemname"
                      onClick={async (event) => {
                        event.stopPropagation();
                        setName(`http://16.171.35.127:3000/play?vid=${e}`);
                        setPlayer(true);
                      }}
                    >
                      {e.substring(e.indexOf("_") + 1)}{" "}
                    </div>
                    <button
                      onClick={() => {
                        deleteVid(e);
                      }}
                    >
                      delete
                    </button>
                  </div>
                );
            })
          : "NO UPLOADS"}
        <button onClick={() => setFile(false)} className="submit">
          BACK
        </button>
      </div>
    </>
  );
};

export default Files;
