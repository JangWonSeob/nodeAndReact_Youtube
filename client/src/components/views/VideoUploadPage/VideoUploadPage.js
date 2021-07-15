import React, { useState } from "react";
import { Typography, Button, Form, message, Input } from "antd";
import Icon from "@ant-design/icons";
import Dropzone from "react-dropzone";

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

function VideoUploadPage() {
  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState("Film & Animation");

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
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form onSubmit>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Drop zone */}

          <Dropzone onDrop multiple={false} maxSize>
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
          <div>
            <img src alt />
          </div>
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
        <Button type="primary" size="large" onClick>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
