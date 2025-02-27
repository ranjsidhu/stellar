"use client";

import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

type AccordionProps = {
  items: {
    label: string;
    children: React.ReactNode;
  }[];
};

export default function Accordion({ items }: AccordionProps) {
  const accordionItems = items.map((item, index) => {
    return {
      key: index,
      label: (
        <div className="text-[#00150f] font-medium text-lg">{item.label}</div>
      ),
      children: <div className="py-2">{item.children}</div>,
    };
  });

  // Custom styling for Ant Design Collapse component
  const collapseStyle = {
    background: "white",
    borderRadius: "0.5rem",
    border: "none",
  };

  // Custom expand icon
  const expandIcon = ({ isActive }: { isActive?: boolean }) => (
    <CaretRightOutlined
      rotate={isActive ? 90 : 0}
      style={{ color: "#00150f", fontSize: "16px" }}
    />
  );

  return (
    <Collapse
      items={accordionItems}
      style={collapseStyle}
      expandIcon={expandIcon}
      expandIconPosition="end"
      bordered={false}
      className="bg-white"
      collapsible="header"
      accordion
    />
  );
}
