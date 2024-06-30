import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: import.meta.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});

const uploadImageToS3 = async (file) => {
  const params = {
    Bucket: import.meta.env.REACT_APP_S3_BUCKET_NAME,
    Key: `${Date.now()}_${file.name}`,
    Body: file,
    ContentType: file.type,
    ACL: "public-read",
  };

  const command = new PutObjectCommand(params);
  try {
    const data = await s3Client.send(command);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    console.log("File uploaded successfully. URL:", url);
    return url;
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
};

export default uploadImageToS3;
