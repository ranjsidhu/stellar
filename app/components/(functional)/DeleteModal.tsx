import { Modal } from "antd";
import { notify } from "@/app/components";
import type { DeleteModalProps } from "@/app/types";

export default function DeleteModal({
  modalOpen,
  setModalOpen,
  confirmLoading,
  setConfirmLoading,
  id,
  table,
  refreshTableData,
}: Readonly<DeleteModalProps>) {
  return (
    <Modal
      centered
      title="Are you sure?"
      okType="danger"
      okText="Yes"
      cancelText="No"
      open={modalOpen}
      onCancel={() => setModalOpen(false)}
      confirmLoading={confirmLoading}
      onOk={() => {
        setConfirmLoading(true);
        fetch(`/api/${table}`, {
          method: "PUT",
          body: JSON.stringify({ id, is_deleted: true }),
        })
          .then(() => {
            notify("success", "Success", "Configuration deleted successfully");
            refreshTableData();
          })
          .catch((error: any) => notify("error", "Error", error.message))
          .finally(() => {
            setModalOpen(false);
            setConfirmLoading(false);
          });
      }}
    >
      <p>Do you want to delete this configuration?</p>
    </Modal>
  );
}
