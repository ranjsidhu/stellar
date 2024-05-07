import { Col, Collapse } from "antd";
import { faqs } from "../constants";
import "./faqs.css";

const items = faqs.map((faq, index) => {
  return {
    key: index,
    label: faq.question,
    children: <p>{faq.answer}</p>,
  };
});

export default function FAQsPage() {
  return (
    <div className="faqs-wrapper">
      <div className="faqs-hero">
        <h2>FAQs</h2>
      </div>
      <div className="faq-accordion">
        <Collapse items={items} />
      </div>
    </div>
  );
}
