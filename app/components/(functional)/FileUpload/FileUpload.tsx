import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Upload } from "antd";
import { v4 as uuidv4 } from "uuid";
import { getUserId } from "@/app/utils/storage";

type FileUploadProps = {
  route: string;
};

export default function FileUpload({ route }: FileUploadProps) {
  const props: UploadProps = {
    onChange(info) {
      if (info.file.status === "done") {
        const rawFile = info.file.originFileObj;
        if (!rawFile) return;

        const formdata = new FormData();
        const filename = info.file.name;
        formdata.append("id", uuidv4());
        formdata.append("filename", filename);
        formdata.append("file", rawFile);
        formdata.append("type", filename.split(".").pop()!);
        formdata.append("user_id", getUserId());

        //   TODO - add error handling
        fetch(`/api/bucket${route}`, {
          method: "POST",
          body: formdata,
          signal: AbortSignal.timeout(10000),
        });
        //   Add success message
      }
    },
    maxCount: 1,
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
}
