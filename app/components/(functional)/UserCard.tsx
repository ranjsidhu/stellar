// app/components/(functional)/UserCard.tsx
import { Select } from "antd";
import { roles, dropdownOnChange } from "@/app/constants/admin";
import { UserCardProps } from "@/app/types";

export default function UserCard({ user, onRoleChange }: UserCardProps) {
  return (
    <div className="bg-[#00150f] rounded-xl shadow-md border border-gray-800 p-4 flex flex-col gap-2">
      <div className="font-semibold text-yellow-400 text-lg">
        {user.full_name}
      </div>
      <div className="text-gray-300 text-sm break-all">{user.email}</div>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-gray-400 text-sm">Role:</span>
        <Select
          value={roles.find((r) => r.label === user.role)?.value}
          style={{ minWidth: 120 }}
          options={roles}
          onChange={(value) =>
            dropdownOnChange(value, user, (newRole) =>
              onRoleChange(user.id, newRole)
            )
          }
        />
      </div>
    </div>
  );
}
