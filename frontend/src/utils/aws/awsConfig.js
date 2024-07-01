import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const awsRegion = import.meta.env.VITE_REACT_AWS_REGION;
const awsAccessKeyId = import.meta.env.VITE_REACT_AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = import.meta.env.VITE_REACT_AWS_SECRET_ACCESS_KEY;
const s3BucketName = import.meta.env.VITE_REACT_S3_BUCKET_NAME;

const s3Client = new S3Client({
  region: awsRegion,
  credentials: {
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
  },
});

const uploadImageToS3 = async (file) => {
  const key = `${Date.now()}_${file.name}`;
  const params = {
    Bucket: s3BucketName,
    Key: key,
    Body: file,
    ContentType: file.type,
  };

  const command = new PutObjectCommand(params);
  try {
    await s3Client.send(command);
    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    const awsBaseUrl = `https://${s3BucketName}.s3.${awsRegion}.amazonaws.com/${key}`;
    console.log("File uploaded successfully. URL:", awsBaseUrl);
    return awsBaseUrl; // Return the base URL
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
};

export default uploadImageToS3;
