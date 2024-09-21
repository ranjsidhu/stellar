import { AdminCard } from "@/app/components";
import { ADMIN_CARDS } from "@/app/constants/admin";
import styles from "./Admin.module.css";

export default function Admin() {
  return (
    <div className={styles.adminWrapper}>
      <div className={styles.adminCards}>
        {ADMIN_CARDS.map((card) => (
          <AdminCard
            key={card.title}
            title={card.title}
            description={card.description}
            route={card.route}
          />
        ))}
      </div>
    </div>
  );
}
