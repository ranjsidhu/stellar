import { Space, Avatar, Divider, Descriptions, Typography } from "antd";
import {
  CalendarOutlined,
  PhoneOutlined,
  HomeOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { User } from "@/app/types";

const { Title } = Typography;

type ViewProfileProps = {
  details: User;
};

const formatDate = (dateString: Date | string) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function ViewProfile({ details }: ViewProfileProps) {
  return (
    <>
      <div className="flex flex-col items-center mb-6">
        <div className="mb-4">
          <Avatar
            size={96}
            icon={<UserOutlined style={{ color: "#00150f" }} />}
            style={{
              backgroundColor: "gold",
              fontSize: "48px",
            }}
          />
        </div>

        <Title level={3} className="m-0">
          {details.first_name} {details.last_name}
        </Title>
      </div>
      <Divider style={{ borderColor: "#00150f" }} />
      <Descriptions layout="vertical" column={{ xs: 1, sm: 2 }}>
        <Descriptions.Item
          label={
            <Space>
              <CalendarOutlined />
              <span>Date of Birth</span>
            </Space>
          }
        >
          {formatDate(details.dob)}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <Space>
              <PhoneOutlined />
              <span>Phone</span>
            </Space>
          }
        >
          {details.phone}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <Space>
              <MailOutlined />
              <span>Email</span>
            </Space>
          }
        >
          {details.email}
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <Space>
              <HomeOutlined />
              <span>Address</span>
            </Space>
          }
          span={2}
        >
          <div className="flex flex-col">
            <span>{details.first_line_address}</span>
            <span>{details.town}</span>
            <span>{details.city}</span>
            <span>{details.postcode}</span>
          </div>
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}