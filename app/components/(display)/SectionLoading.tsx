import { Spin } from "antd";
import { SectionLoadingProps } from "@/app/types";

export default function SectionLoading({
  loading,
  children,
}: Readonly<SectionLoadingProps>) {
  return (
    <Spin tip="loading" spinning={loading} size="large">
      {children}
    </Spin>
  );
}
