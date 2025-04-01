import { Button, Space } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { ProfileActionsProps } from "@/app/types";

export default function ProfileActions({
  isEditing,
  setIsEditing,
  form,
}: Readonly<ProfileActionsProps>) {
  const handleCancel = () => {
    form.resetFields();
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <Space>
          <Button
            icon={<SaveOutlined />}
            onClick={() => form.submit()}
            style={{ backgroundColor: "gold", color: "#00150f" }}
          >
            Save
          </Button>
          <Button icon={<CloseOutlined />} onClick={handleCancel}>
            Cancel
          </Button>
        </Space>
      ) : (
        <Button
          icon={<EditOutlined />}
          onClick={() => setIsEditing(true)}
          style={{ backgroundColor: "gold", color: "#00150f" }}
        >
          Edit Profile
        </Button>
      )}
    </>
  );
}
