import { Button, FormInstance, Space } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { User } from "@/app/types";
import { Dispatch, SetStateAction } from "react";

type ProfileActionsProps = {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  form: FormInstance<User>;
};

export default function ProfileActions({
  isEditing,
  setIsEditing,
  form,
}: ProfileActionsProps) {
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
