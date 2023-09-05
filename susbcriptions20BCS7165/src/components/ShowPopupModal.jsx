import React from "react";

const ShowPopupModal = ({ currentShow, setShowModal }) => {
  const title = currentShow.jawSummary.title;
  return (
    <div
      className="modalmaincont"
      onClick={() => {
        setShowModal(false);
      }}
    >
      <div
        className="modalmainbox"
        id="modalmainbox"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          className="modalclosebut"
          onClick={(e) => {
            setShowModal(false);
          }}
        >
          X
        </button>

        <div
          className="modalboximg"
          style={{
            backgroundImage: `url(${currentShow.jawSummary.backgroundImage.url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {currentShow.jawSummary.logoImage != undefined ? (
            <img
              src={currentShow.jawSummary.logoImage.url}
              alt={currentShow.jawSummary.title}
              className="modallogopic"
            />
          ) : (
            currentShow.jawSummary.title
          )}
          <button className="playbut">Play</button>
        </div>
        <div className="showdetails">
          <div className="leftdet">
            <div className="lefttop">
              {
                /* {(() => {
                const d = new Date(
                  currentShow.availability.availabilityStartTime
                );
                return d.getFullYear() + " ";
              })()} */ currentShow.jawSummary.releaseYear + " "
              }
              {currentShow.episodeCount} Episodes
              <br />
              {currentShow.jawSummary.tags.map((e) => {
                return e.name + ", ";
              })}
            </div>
            <div className="leftbot">{currentShow.jawSummary.synopsis}</div>
          </div>
          <div className="rightdet">
            <div className="cast">
              Cast:{" "}
              {currentShow.jawSummary.cast.slice(0, 3).map((e) => {
                return e.name + ", ";
              })}{" "}
              more...
            </div>
            <div className="genre">
              Genre:{" "}
              {currentShow.jawSummary.genres.map((e) => {
                return e.name + ", ";
              })}
            </div>
          </div>
        </div>
        <div className="showepisodes">Episodes</div>
      </div>
    </div>
  );
};

export default ShowPopupModal;
