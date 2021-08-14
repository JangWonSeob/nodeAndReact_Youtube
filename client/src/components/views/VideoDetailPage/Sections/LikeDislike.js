import React, { useEffect, useState } from "react";
import { Icon, Tooltip } from "antd";
import axios from "axios";

function LikeDislike(props) {
  const [Likes, setLikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(false);
  const [Dislikes, setDislikes] = useState(0);
  const [DislikeAction, setDislikeAction] = useState(false);

  let variable = {};

  console.log("props : ", props);
  let videoId = props.videoId;
  let video = props.video;
  console.log("video : ", video);
  console.log("videoId : ", videoId);
  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }
  console.log("props video : ", props.video);
  console.log("props videoId : ", props.videoId);
  console.log("props22 : ", props);
  useEffect(() => {
    axios.post("/api/like/getLikes", variable).then((res) => {
      console.log("likes data: ", res.data);
      console.log("likes data 111: ", res.data.likes.length);
      if (res.data.success) {
        // 얼마나 많은 좋아요를 받았는지
        setLikes(res.data.likes.length);
        // 내가 좋아요를 눌럿는지
        res.data.likes.map((like) => {
          if (like.userid === props.userId) {
            setLikeAction(true);
          }
        });
      } else {
        alert("Likes에 대한 정보를 가져오지 못했습니다.");
      }
    });
    axios.post("/api/like/getDislikes", variable).then((res) => {
      console.log("dislikes data: ", res.data);
      if (res.data.success) {
        // 얼마나 많은 싫어요를 받았는지
        setDislikes(res.data.dislikes.length);

        // 내가 싫어요를 눌럿는지
        res.data.dislikes.map((dislike) => {
          if (dislike.userid === props.userId) {
            setDislikeAction(true);
          }
        });
      } else {
        alert("Dislikes에 대한 정보를 가져오지 못했습니다.");
      }
    });
  }, []);

  const onLike = () => {
    if (!LikeAction) {
      // Like가 클릭이 되지 않았을 때
      axios.post("/api/like/upLike", variable).then((res) => {
        console.log("upLike data", res.data);
        if (res.data.success) {
          // Likes를 올려준다.
          setLikes(Likes + 1);
          setLikeAction(true);
          // Dislike를 내려준다.
          if (DislikeAction) {
            setDislikes(Dislikes - 1);
            setDislikeAction(false);
          }
        } else {
          alert("Like를 올리지 못했습니다.");
        }
      });
    } else {
      // Like가 클릭이 되어 있을 때
      axios.post("/api/like/unLike", variable).then((res) => {
        console.log("upLike data", res.data);
        if (res.data.success) {
          setLikes(Likes - 1);
          setLikeAction(false);
        } else {
          alert("Like를 내리지 못했습니다.");
        }
      });
    }
  };
  const onDislike = () => {
    if (!DislikeAction) {
      // Dislike가 클릭이 되지 않았을 때
      axios.post("/api/like/upDislike", variable).then((res) => {
        console.log("upDislike data", res.data);
        if (res.data.success) {
          // Dislikes를 올려준다.
          setDislikes(Dislikes + 1);
          setDislikeAction(true);
          // Likes를 내려준다.
          if (DislikeAction) {
            setLikes(Likes - 1);
            setLikeAction(false);
          }
        } else {
          alert("Dislike를 올리지 못했습니다.");
        }
      });
    } else {
      // Dislike가 클릭이 되어 있을 때
      axios.post("/api/like/unDislike", variable).then((res) => {
        console.log("unDislike data", res.data);
        if (res.data.success) {
          setDislikes(Dislikes - 1);
          setDislikeAction(false);
        } else {
          alert("Dislike를 내리지 못했습니다.");
        }
      });
    }
  };

  return (
    <div style={{ marginRight: "20px" }}>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={LikeAction ? "filled" : "outlined"}
            onClick={onLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Likes}</span>
      </span>
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={DislikeAction ? "filled" : "outlined"}
            onClick={onDislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Dislikes}</span>
      </span>
    </div>
  );
}

export default LikeDislike;
