import React, { useState } from "react";
import { Upload, Avatar, message } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadChangeParam } from "antd/es/upload";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const UploadAvatar: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => setImageUrl(url));
    }
  };

  return (
    <ImgCrop rotationSlider>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <Avatar src={imageUrl} size={100} />
        ) : (
          <Avatar size={100} icon={<UserOutlined />} />
        )}
        <div>
          <UploadOutlined /> Upload
        </div>
      </Upload>
    </ImgCrop>
  );
};

export default UploadAvatar;
