"use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { getItem } from "@/app/utils/storage";
// import type { User } from "@/app/types";
// import { FileUpload } from "@/app/components";
// import { downloadFile } from "@/app/utils";
import styles from "./Profile.module.css";

export default function Profile() {
  // const router = useRouter();
  // const [details, setDetails] = useState<User | null>(null);

  // useEffect(() => {
  //   const userDetails = getItem("userDetails");
  //   const parsedUserDetails: User | null = userDetails ? userDetails : null;
  //   if (!parsedUserDetails?.id || parsedUserDetails?.id === -1) {
  //     router.push("/login?return=profile");
  //     return;
  //   }
  //   setDetails(parsedUserDetails);
  // }, [router]);

  // const handleClick = async () => {
  //   fetch("/api/bucket/cv/4557e907-a4ed-4509-859c-f19399133c32.docx").then(
  //     (res) => {
  //       res.blob().then((data) => {
  //         const filename = res.headers.get("X-Filename") || "download.docx";
  //         downloadFile(data, filename);
  //       });
  //     }
  //   );
  // };

  return (
    <div className={styles.profileWrapper}>
      {/* {details &&
        Object.entries(details).map(([key, value]) => (
          <div key={key}>
            {key}: {value?.toString()}
          </div>
        ))} */}
      {/* <FileUpload route="/cv" /> */}
      {/* <button onClick={handleClick}>Click me</button> */}
    </div>
  );
}
