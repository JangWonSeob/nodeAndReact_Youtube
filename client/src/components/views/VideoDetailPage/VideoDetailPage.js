import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comment from "./Sections/Comment";
import LikeDislike from "./Sections/LikeDislike";

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variabele = {
    videoId: videoId,
  };

  console.log("videoId : ", videoId);
  const [Comments, setComments] = useState([]);
  const [VidoeDetail, setVidoeDetail] = useState([]);
  useEffect(() => {
    axios.post("/api/video/getVideoDetail", variabele).then((res) => {
      if (res.data.success) {
        // console.log("res.data.videosDetail : ", res.data.videosDetail);
        setVidoeDetail(res.data.videosDetail);
      } else {
        alert("비디오를 가져오지 못했습니다.");
      }
      axios.post("/api/comment/getComments", variabele).then((res) => {
        console.log("res.data : ", res.data.comments);
        if (res.data.success) {
          setComments(res.data.comments);
        } else {
          alert("댓글 정보를 가져오지 못했습니다.");
        }
      });
    });
  }, []);
  const refreshFunction = (newComment) => {
    setComments(Comments.concat(newComment)); // concat : Comments와 newComment를 합친 값을 setComments 넣는다.
  };

  if (VidoeDetail.writer) {
    const subscribeButton = VidoeDetail.writer._id !==
      localStorage.getItem("userId") && (
      <Subscribe
        userTo={VidoeDetail.writer._id}
        userFrom={localStorage.getItem("userId")} // local Storage에 미리 저장해둔 userId를 가져온다.
      />
    );
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
            <List.Item
              actions={[
                <LikeDislike
                  video
                  videoId={videoId}
                  userId={localStorage.getItem("userId")}
                />,
                subscribeButton,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={VidoeDetail.writer.image} />}
                title={VidoeDetail.writer.name}
                description={VidoeDetail.description}
              />
            </List.Item>
          </div>
          {/* Comments */}
          <Comment
            refreshFunction={refreshFunction}
            CommentLists={Comments}
            videoId={videoId}
          />
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
