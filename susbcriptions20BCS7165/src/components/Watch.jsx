import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowPopupModal from "./ShowPopupModal";
import { Link } from "react-router-dom";
const Watch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [suggestions, setSuggestions] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState();
  const getnf = async (searchTerm) =>
    await axios
      .get("http://localhost:3000/fetchNetflix", {
        headers: {
          searchTerm: searchTerm,
        },
      })
      .then((response) => {
        console.log(response.data);
        setSearchResults(response.data[0]);
        setSuggestions(response.data[1]);
      });
  useEffect(() => {
    getnf("");
  }, []);

  return (
    <>
      <div className="navbar">
        <Link to="/manage">MANAGE PLAN</Link>
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchBar"
        />
        <button onClick={() => getnf(searchTerm)}>search</button>
      </div>
      {showModal && (
        <ShowPopupModal setShowModal={setShowModal} currentShow={selected} />
      )}
      <div className="watchmaincont">
        <div className="contentrow">
          {searchResults &&
            searchResults.map((item) => {
              return (
                <div
                  onMouseEnter={(e) =>
                    (e.target.style = `background-image:url(${item.jawSummary.backgroundImage.url});background-size:contain`)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style = `background-image:url()`)
                  }
                  className="showbox"
                  onClick={() => {
                    setShowModal(true);
                    setSelected(item);
                  }}
                >
                  {item.jawSummary.logoImage != undefined ? (
                    <img
                      src={item.jawSummary.logoImage.url}
                      alt={item.jawSummary.title}
                      className="showpic"
                    />
                  ) : (
                    item.jawSummary.title
                  )}
                </div>
              );
            })}
        </div>

        {/* {searchResults &&
          suggestions.map((item) => {
            return <div>{item.summary.name}</div>;
          })} */}
        <div className="footer">footer</div>
      </div>
    </>
  );
};

export default Watch;
