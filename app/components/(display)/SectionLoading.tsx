import { Spin } from "antd";

type SectionLoadingProps = { loading: boolean; children: React.ReactNode };

export default function SectionLoading({
  loading,
  children,
}: SectionLoadingProps) {
  return (
    <Spin tip="loading" spinning={loading} size="large">
      {children}
    </Spin>
  );
}
