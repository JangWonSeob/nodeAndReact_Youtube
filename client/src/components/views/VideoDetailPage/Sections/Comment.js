import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

function Comment(props) {
  const [CommentValue, setCommentValue] = useState("");
  //  const user = useSelector((state) => state.user);
  const videoId = props.videoId;

  //  console.log("user redux : ", user.userData._id);

  const handClick = (e) => {
    setCommentValue(e.currentTarget.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const variabele = {
      content: CommentValue,
      writer: localStorage.getItem("userId"),
      videoId: videoId,
    };
    axios.post("/api/comment/saveComment", variabele).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        setCommentValue(""); // 댓글 전송 후 썻던 Input 창에 작성한 댓글이 지워짐
        props.refreshFunction(res.data.result);
      } else {
        alert("댓글을 저장하지 못했습니다.");
      }
    });
  };

  return (
    <div>
      <br />
      <p>Replies</p>
      <br />
      {/* Comment Lists */}
      {props.CommentLists &&
        props.CommentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment key={index}>
                <SingleComment
                  refreshFunction={props.refreshFunction}
                  comment={comment}
                  videoId={videoId}
                />
                <ReplyComment
                  refreshFunction={props.refreshFunction}
                  CommentLists={props.CommentLists}
                  parentCommentId={comment._id}
                  videoId={videoId}
                />
              </React.Fragment>
            )
        )}

      {/* Root Comment Form */}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRandius: "5px" }}
          onChange={handClick}
          value={CommentValue}
          placeholder="코멘트를 작성해 주세요"
        ></textarea>
        <br />
        <button style={{ width: "20% ", heigth: "52px" }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;
