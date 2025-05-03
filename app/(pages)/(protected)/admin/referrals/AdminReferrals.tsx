"use client";

import { useState, useEffect } from "react";
import { Table, SectionLoading } from "@/app/components";
import {
  type ReferralsType,
  referralsColumns,
} from "@/app/constants/tables/referrals";

export default function AdminReferrals() {
  const [referrals, setReferrals] = useState<ReferralsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await fetch("/api/referrals");
        const { data } = await res.json();
        setReferrals(
          data.map((referral: any) => ({ ...referral, key: referral.id }))
        );
        setLoading(false);
      } catch (error: any) {
        console.error("Failed to fetch referrals:", error);
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  return (
    <div className="flex justify-center items-center h-full w-[95%] mx-auto">
      <SectionLoading loading={loading}>
        <Table columns={referralsColumns} rows={referrals || []} />
      </SectionLoading>
    </div>
  );
}
