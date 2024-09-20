"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/redux/hooks";
import { createClient } from "@/app/utils/supabase/client";
import { setSession } from "@/app/redux/features/Auth";
import { getUserEmail, setItem, getUserRole } from "@/app/utils/storage";

export default function Redirect() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const validateSession = async () => {
      const adminRoutes = ["/admin"];
      const previousRole = getUserRole();
      let role = "";
      const email = getUserEmail();
      if (email) {
        fetch("/api/auth/roles/refresh", {
          method: "POST",
          body: JSON.stringify({ email }),
        })
          .then((res) => res.json())
          .then((data) => {
            setItem("userDetails", data);
            role = data.roles.name;
            if (role !== previousRole) {
              window.location.reload();
            } else {
              role = previousRole;
            }
          })
          .finally(async () => {
            const { data } = await supabase.auth.getSession();
            const { session } = data;
            dispatch(setSession(session));

            if (
              (pathname === "/login" || pathname === "/register") &&
              session
            ) {
              router.push("/");
              return;
            }

            if (adminRoutes.includes(pathname) && role !== "Admin") {
              router.push("/");
            }
          });
      }
    };

    validateSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        dispatch(setSession(session));
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [router, pathname, dispatch, supabase.auth]);
  return <></>;
}
