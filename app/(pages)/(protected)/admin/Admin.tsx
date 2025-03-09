import { AdminCard } from "@/app/components";
import { ADMIN_CARDS } from "@/app/constants/admin";

export default function Admin() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-full max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
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
    </div>
  );
}
