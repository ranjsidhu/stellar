"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/redux/hooks";
import { createClient } from "@/app/utils/supabase/client";
import { setSession } from "@/app/redux/features/Auth";
import { getUserEmail, setItem, getUserRole } from "@/app/utils/storage";
import { ADMIN_CARDS } from "@/app/constants/admin";
import { notify } from "../(display)/Notification";
import { updateDetails } from "./serveractions";

export default function Redirect() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const adminRoutes = [...ADMIN_CARDS.map((card) => card.route), "/admin"];
    const isAdminRoute = pathname.includes("/admin");
    const isAuthPage = pathname === "/login" || pathname === "/register";

    const checkAndUpdateRole = async (email: string, previousRole: string) => {
      const userdetails = await updateDetails(email);
      if (!userdetails.success || !userdetails.data) return null;

      const { data } = userdetails;
      setItem("userDetails", data);
      const newRole = data.roles.name;

      if (newRole !== previousRole) {
        window.location.reload();
      }
      return newRole || previousRole;
    };

    const handleRouting = (session: any, role: string | null) => {
      if (isAuthPage && session) {
        router.push("/");
        return;
      }

      if (
        (isAdminRoute || adminRoutes.includes(pathname)) &&
        role !== "Admin"
      ) {
        router.push("/");
      }
    };

    const validateSession = async () => {
      const email = getUserEmail();
      if (!email && isAdminRoute) router.push("/");
      if (!email) return;

      try {
        const role = await checkAndUpdateRole(email, getUserRole());
        const { data } = await supabase.auth.getSession();
        dispatch(setSession(data.session));
        handleRouting(data.session, role);
      } catch (error: any) {
        notify("error", "Error", "Session validation failed:" + error);
      }
    };

    validateSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      dispatch(setSession(session));
    });

    return () => listener?.subscription.unsubscribe();
  }, [router, pathname, dispatch, supabase.auth]);

  return <></>;
}
