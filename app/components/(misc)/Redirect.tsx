"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/redux/hooks";
import { createClient } from "@/app/utils/supabase/client";
import { setSession } from "@/app/redux/features/Auth";

export default function Redirect() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const validateSession = async () => {
      const { data } = await supabase.auth.getSession();
      const { session } = data;
      dispatch(setSession(session));

      // If already logged in, redirect to home page
      if ((pathname === "/login" || pathname === "/register") && session) {
        router.push("/");
        return;
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