import React from "react";

export default React.memo(function Card({ title, textContent, videoUrl }) {
  return (
    <div tabIndex={0} className="card" style={{ minHeight: "300px", margin: "0 2px" }}>
      <div className="my-2" style={{ textAlign: "center" }}>
        <iframe
          src={videoUrl}
          allowfullscreen="allowfullscreen"
          title="YouTube video player"
          frameborder="2"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          //allowfullscreen
          style={{ width: "220px", height: "125px" }}
        ></iframe>
        <h5 className="card-title" style={{ fontSize: "1rem" }}>
          {title}
        </h5>
        <p className="card-text" style={{ fontSize: "0.8rem" }}>
          {textContent}
        </p>
      </div>
    </div>
  );
});
