import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadProps } from "antd";
import type { RcFile } from "antd/es/upload/interface";
import { IntrinsicAttributes } from "@/types/other";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/jpeg";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
    return false;
  }
  return true;
};

const UploadAvatar = ({ imageUrl, setImageUrl }: IntrinsicAttributes) => {
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps["onChange"] = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (
      info.file.status === "done" ||
      info.file.status === ("success" as string)
    ) {
      await getBase64(info.file.originFileObj as RcFile, async (url) => {
        setLoading(false);
        setImageUrl({ url, info: info.file });
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div className="upload_config">
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={({ file, onSuccess }) => {
          onSuccess?.("ok");
          handleChange({ file, fileList: [file] } as any);
        }}
        onChange={handleChange}
      >
        {imageUrl?.url ? (
          <img
            src={imageUrl?.url}
            alt="avatar"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
};

export default UploadAvatar;
