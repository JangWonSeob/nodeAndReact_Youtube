const express = require("express");
const router = express.Router();
const { Video } = require("../models/Video");
const { Subscriber } = require("../models/Subscriber");

const { auth } = require("../middleware/auth");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");

var storage = multer.diskStorage({
  // 파일 저장 위치
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  // 파일 이름 : 날짜_파일명
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  //   mp4만 저장 가능하도록 설정
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

//=================================
//             Video
//=================================

router.get("/getVideos", (req, res) => {
  //비디오를 DB에서 가져와서 클라이언트에 보낸다.
  Video.find()
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, videos });
    });
});

router.post("/getVideoDetail", (req, res) => {
  // console.log("req.body detail :", req.body);
  Video.findOne({ _id: req.body.videoId })
    .populate("writer")
    .exec((err, videosDetail) => {
      // console.log("videosDetail video :", videosDetail);
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, videosDetail });
    });
});

router.post("/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/uploadVideo", (req, res) => {
  // console.log("req.body : ", req.body);
  // 비디오 정보들을 저장한다.
  const video = new Video(req.body);
  video.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/thumbnail", (req, res) => {
  // 썸네일 생성하고 비디오 러닝타임도 가져오기

  let filePath = "";
  let fileDuration = "";

  // 비디오 정보 가져오기(duration: 영상시간)
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.dir(metadata);
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  // 썸네일 생성
  ffmpeg(req.body.url)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      console.log("filenames : ", filenames);

      filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("screenshots taken");
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
    })
    .on("error", function (err) {
      console.log(err);
      return res.json({ success: false, err });
    })
    .screenshot({
      count: 3, // Screenshot 저장 갯수
      folder: "uploads/thumbnails", // Screenshot 저장 위치
      size: "320x240", // Screenshot 사이즈
      filename: "thumbnail-%b.png", // Screenshot 이름
    });
});

router.post("/getSubscriptionVideos", (req, res) => {
  // 구독 정보를 가져옵니다.
  Subscriber.find({ userFrom: req.body.userFrom }).exec(
    (err, subscribeInfo) => {
      if (err) return res.status(200).json({ success: false, err });

      let subscribeUser = [];
      subscribeInfo.map((subscriber, index) => {
        subscribeUser.push(subscriber.userTo);
      });

      Video.find({ writer: { $in: subscribeUser } })
        .populate("writer")
        .exec((err, videos) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({ success: true, videos });
        });
    }
  );
  // 구독한 사람의 비디오를 가져옵니다.
});

module.exports = router;
