import { Card, Button } from "antd";
import {
  EyeOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { DocumentCardProps } from "@/app/types";
import { getFileIcon } from "@/app/constants";

export default function DocumentCard({
  document,
  onPreview,
  onDownload,
  onDelete,
}: Readonly<DocumentCardProps>) {
  return (
    <Card className="w-full hover:shadow-lg hover:cursor-pointer transition-shadow duration-300">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">{getFileIcon(document.filename)}</div>

        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {document.filename}
            </h3>
            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
              {document.file_types.name}
            </span>
          </div>

          <div className="mt-2 flex space-x-2">
            {onPreview && (
              <Button
                type="text"
                size="small"
                icon={<EyeOutlined />}
                onClick={() => onPreview(document)}
                className="text-gray-600 hover:text-blue-600"
              >
                Preview
              </Button>
            )}
            {onDownload && (
              <Button
                type="text"
                size="small"
                icon={<DownloadOutlined />}
                onClick={() => onDownload(document)}
                className="text-gray-600 hover:text-green-600"
              >
                Download
              </Button>
            )}
            {onDelete && (
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={() => onDelete(document)}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
