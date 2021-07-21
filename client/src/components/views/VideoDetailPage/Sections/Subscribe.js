import axios from "axios";
import React, { useEffect, useState } from "react";

function Subscribe(props) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    let variable = {
      userTo: props.userTo,
    };
    axios.post("/api/subscribe/subscribeNumber", variable).then((res) => {
      console.log(1);
      if (res.data.success) {
        setSubscribeNumber(res.data.subscribeNumber);
      } else {
        alert("구독자 수 정보를 받아오지 못했습니다");
      }
    });
    let subscribedvariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };
    axios.post("/api/subscribe/subscribed", subscribedvariable).then((res) => {
      console.log(2);
      console.log("res.data.subscribed : ", res.data.subscribed);
      if (res.data.success) {
        setSubscribed(res.data.subscribed);
      } else {
        alert("정보를 받아오지 못했습니다");
      }
    });
  }, []);

  const onSubscribe = () => {
    let subscribeVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };
    // 이미 구독 중이라면
    if (Subscribed) {
      axios
        .post("/api/subscribe/unSubscribe", subscribeVariable)
        .then((res) => {
          // console.log(res.data);
          console.log(3);
          if (res.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert("구독 취소하는데 실패했습니다.");
          }
        });
    }
    //아직 구독 중이 아니라면
    else {
      axios.post("/api/subscribe/subscribe", subscribeVariable).then((res) => {
        console.log(4);
        if (res.data.success) {
          setSubscribeNumber(SubscribeNumber + 1);
          setSubscribed(!Subscribed);
        } else {
          alert("구독 하는데 실패했습니다.");
        }
      });
    }
  };

  console.log("SubscribeNumber : ", SubscribeNumber);
  console.log("Subscribed", Subscribed);
  return (
    <div>
      <div>구독자 {SubscribeNumber}명</div>
      <br />
      <botton
        style={{
          backgroundColor: `${Subscribed ? "gray" : "red"}`,
          borderRadis: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
        onClick={onSubscribe}
      >
        {Subscribed ? "구독 중" : "구독하기"}
      </botton>
    </div>
  );
}

export default Subscribe;
