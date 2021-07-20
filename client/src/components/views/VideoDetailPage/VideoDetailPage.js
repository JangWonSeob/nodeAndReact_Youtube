import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import SideVideo from "./Sections/SideVideo";

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variabele = {
    videoId: videoId,
  };
  const [VidoeDetail, setVidoeDetail] = useState([]);
  useEffect(() => {
    axios.post("/api/video/getVideoDetail", variabele).then((res) => {
      if (res.data.success) {
        console.log("res.data.videosDetail : ", res.data.videosDetail);
        setVidoeDetail(res.data.videosDetail);
      } else {
        alert("비디오를 가져오지 못했습니다.");
      }
    });
  }, []);

  if (VidoeDetail.writer) {
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${VidoeDetail.filePath}`}
              controls
            />
            <span>{VidoeDetail.title}</span>
            <List.Item actions>
              <List.Item.Meta
                avatar={<Avatar src={VidoeDetail.writer.image} />}
                title={VidoeDetail.writer.name}
                description={VidoeDetail.description}
              />
            </List.Item>
          </div>
          {/* Comments */}
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>...loading</div>;
  }
}

export default VideoDetailPage;
