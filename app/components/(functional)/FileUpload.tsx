"use client";

import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Upload } from "antd";
import { v4 as uuidv4 } from "uuid";
import { getUserId } from "@/app/utils/storage";
import { notify } from "@/app/components";

type FileUploadProps = {
  route: string;
  // -disable-next-line no-unused-vars
  onSuccess?: (id: number, file_id: string, filename: string) => void;
};

export default function FileUpload({
  route,
  onSuccess,
}: Readonly<FileUploadProps>) {
  const [fileList, setFileList] = useState<any[]>([]);

  const props: UploadProps = {
    fileList,
    async onChange(info) {
      setFileList(info.fileList);

      if (info.file.status === "done") {
        const rawFile = info.file.originFileObj;
        if (!rawFile) return;

        const formdata = new FormData();
        const filename = info.file.name;
        formdata.append("id", uuidv4());
        formdata.append("filename", filename);
        formdata.append("file", rawFile);
        formdata.append("type", filename.split(".").pop()!);
        const user_id = await getUserId();
        if (!user_id) {
          notify("error", "File Upload Failed", "Failed to upload file");
          setFileList([]);
          return;
        }
        formdata.append("user_id", user_id);

        fetch(`/api/bucket/${route}`, {
          method: "POST",
          body: formdata,
          signal: AbortSignal.timeout(10000),
        })
          .then((res) => res.json())
          .then(({ id, file_id, filename }) => {
            if (onSuccess) {
              onSuccess(id, file_id, filename);
            }
            setFileList([]);
            notify("success", "File Uploaded", "File has been uploaded");
          })
          .catch(() => {
            notify("error", "File Upload Failed", "Failed to upload file");
            setFileList([]);
          });
      }
    },
    maxCount: 1,
    showUploadList: {
      showRemoveIcon: false,
      showPreviewIcon: false,
    },
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
}
