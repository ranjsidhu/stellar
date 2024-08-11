import { Collapse } from "antd";
import { faqs } from "../../constants";
import styles from "./Faqs.module.css";

const items = faqs.map((faq, index) => {
  return {
    key: index,
    label: faq.question,
    children: <p>{faq.answer}</p>,
  };
});

export default function FAQsPage() {
  return (
    <section>
      <div className={styles.faqsHero}>
        <h2>FAQs</h2>
      </div>
      <div className={styles.faqsWrapper}>
        <div className={styles.faqsAccordion}>
          <Collapse items={items} />
        </div>
      </div>
    </section>
  );
}
