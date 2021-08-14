import React, { useState, useEffect } from "react";
import axios from "axios";

function SideVideo() {
  const [sideVideo, setsideVideo] = useState([]);

  useEffect(() => {
    axios.get("/api/video/getVideos").then((res) => {
      if (res.data.success) {
        console.log(res.data.videos);
        setsideVideo(res.data.videos);
      } else {
        alert("비디오를 불러오지 못했습니다.");
      }
    });
  }, []);
  const rendSideVideo = sideVideo.map((video, index) => {
    console.log("video : ", video);
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <div
        key={index}
        style={{ display: "flex", marginBottom: "1rem", padding: " 0 2rem" }}
      >
        <div style={{ width: "40%", marginRight: "1rem" }}>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt={video.title}
            />
          </a>
        </div>
        <div style={{ width: "50%" }}>
          <a href={`/video/${video._id}`} style={{ color: "gray" }}>
            <span style={{ fontSize: "1rem", color: "black" }}>
              {video.title}
            </span>
            <br />
            <span>{video.writer.name}</span>
            <br />
            <span>{video.views} views</span>
            <br />
            <span>
              {minutes} : {seconds}
            </span>
            <br />
          </a>
        </div>
      </div>
    );
  });
  return (
    <React.Fragment>
      <div sytle={{ marginTop: "3rem" }}>다른 영상</div>
      {rendSideVideo}
    </React.Fragment>
  );
}

export default SideVideo;
