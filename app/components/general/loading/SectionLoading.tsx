import { Spin } from "antd";
import "./loading.css";

type SectionLoadingProps = { loading: boolean; children: React.ReactNode };

export default function SectionLoading({
  loading,
  children,
}: SectionLoadingProps) {
  return (
    <Spin
      tip="loading"
      spinning={loading}
      size="large"
      className="section-loading-spinner"
    >
      {children}
    </Spin>
  );
}
