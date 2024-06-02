import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';


cloudinary.config({
  cloud_name: 'dsjvemybd',
  api_key: '919338145784547',
  api_secret: 'XEX6mXzAxXFxhT9prAxpKiQ4L_k'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'nft-upload',
    format: async (req, file) => 'glb',
    public_id: (req, file) => file.originalname,
  },
});

const upload = multer({ storage: storage });

const app = express();
const port = 5000;

app.use(cors());

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.json({ url: req.file.path });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
