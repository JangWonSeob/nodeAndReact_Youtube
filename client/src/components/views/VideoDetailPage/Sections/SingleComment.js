import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

function SingleComment(props) {
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");
  const user = useSelector((state) => state.user);

  const videoId = props.videoId;

  const onClickOpenReply = () => {
    setOpenReply(!OpenReply);
  };
  const onHandleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const variabele = {
      content: CommentValue,
      writer: user.userData._id,
      videoId: videoId,
      responseTo: props.comment._id,
    };
    axios.post("/api/comment/saveComment", variabele).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        console.log(res.data.result);
        setCommentValue(""); // 댓글 전송 후 썻던 Input 창에 작성한 댓글이 지워짐
        setOpenReply(false);
        props.refreshFunction(res.data.result);
      } else {
        alert("댓글을 저장하지 못했습니다.");
      }
    });
  };
  const actions = [
    <span onClick={onClickOpenReply} key="comment-basic=">
      Reply to
    </span>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt="image" />}
        content={<p>{props.comment.content}</p>}
      ></Comment>

      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <textarea
            style={{ width: "100%", borderRandius: "5px" }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="코멘트를 작성해 주세요"
          ></textarea>
          <br />
          <button style={{ width: "20% ", heigth: "52px" }} onClick={onSubmit}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
