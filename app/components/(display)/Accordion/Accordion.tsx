import { Collapse } from "antd";

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
      label: item.label,
      children: item.children,
    };
  });

  return <Collapse items={accordionItems} />;
}
