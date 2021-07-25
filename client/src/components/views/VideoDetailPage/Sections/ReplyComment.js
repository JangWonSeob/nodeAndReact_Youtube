import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComments, setOpenReplyComments] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    props.CommentLists.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [props.CommentLists]);

  let renderReplyComment = (parentCommentId) =>
    props.CommentLists.map((comment, index) => (
      <React.Fragment>
        {comment.responseTo === parentCommentId && (
          <div style={{ marginLeft: "40px" }}>
            <SingleComment
              comment={comment}
              videoId={props.videoId}
              refreshFunction={props.refreshFunction}
            />
            <ReplyComment
              CommentLists={props.CommentLists}
              parentCommentId={comment._id}
              videoId={props.videoId}
              refreshFunction={props.refreshFunction}
            />
          </div>
        )}
      </React.Fragment>
    ));

  const onHandChange = () => {
    setOpenReplyComments(!OpenReplyComments);
  };

  console.log("OpenReplyComments : ", OpenReplyComments);
  return (
    <div>
      {ChildCommentNumber > 0 && (
        <p
          style={{ fontSize: "14px", margin: 0, color: "gray" }}
          onClick={onHandChange}
        >
          View {ChildCommentNumber} more comment(s)
        </p>
      )}

      {OpenReplyComments === true && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
