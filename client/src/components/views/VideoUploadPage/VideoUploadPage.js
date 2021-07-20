import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useSelector } from "react-redux";

const { Title } = Typography;
const { TextArea } = Input;

const PrivateOption = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];
const CategoryOption = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
  { value: 4, label: "Sports" },
];

function VideoUploadPage(props) {
  const user = useSelector((state) => state.user);

  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState("Film & Animation");
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [ThumbnailPath, setThumbnailPath] = useState("");

  const onChangeTitle = (e) => {
    setVideoTitle(e.currentTarget.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onChangePrivate = (e) => {
    setPrivate(e.currentTarget.value);
  };
  const onChangeCategory = (e) => {
    setCategory(e.currentTarget.value);
  };
  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    console.log(files);
    formData.append("file", files[0]);

    axios.post("/api/video/uploadfiles", formData, config).then((res) => {
      console.log("res.data : ", res.data);
      if (res.data.success) {
        let variable = {
          url: res.data.filePath,
          fileName: res.data.fileName,
        };

        setFilePath(res.data.filePath);

        axios.post("/api/video/thumbnail", variable).then((res) => {
          if (res.data.success) {
            console.log(res.data.url);
            setDuration(res.data.fileDuration);
            setThumbnailPath(res.data.url);
          } else {
          }
        });
      } else {
        alert("비디오 업로드를 실패하였습니다.");
      }
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      title: VideoTitle,
      description: Description,
      privacy: Private,
      filePath: FilePath,
      category: Category,
      duration: Duration,
      thumbnail: ThumbnailPath,
    };
    axios.post("/api/video/uploadVideo", variables).then((res) => {
      console.log("res.data upload : ", res.data);
      if (res.data.success) {
        message.success("성공적으로 업로드를 했습니다.");

        // 3초 후에 LandingPage로 이동
        setTimeout(() => {
          props.history.push("/");
        }, 3000);
      } else {
        alert("비디오 업로드에 실패 했습니다.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form onSubmit={onsubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Dropzone onDrop={onDrop} multiple={false} maxSize={10000000000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>

          {/* Thumbnail */}
          {ThumbnailPath && (
            <div>
              <img
                src={`http://localhost:5000/${ThumbnailPath}`}
                alt="thumbnails"
              />
            </div>
          )}
        </div>
        <br /> <br />
        <label>Title</label>
        <Input onChange={onChangeTitle} value={VideoTitle} />
        <br /> <br />
        <label>Description</label>
        <TextArea onChange={onChangeDescription} value={Description} />
        <br /> <br />
        <select onChange={onChangePrivate}>
          {PrivateOption.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
          <br /> <br />
        </select>
        <br /> <br />
        <select onChange={onChangeCategory}>
          {CategoryOption.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br /> <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
