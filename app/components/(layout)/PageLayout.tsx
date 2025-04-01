import { ComponentChildren } from "@/app/types";

export default function PageLayout({ children }: ComponentChildren) {
  return (
    <div className="flex flex-col justify-center items-center w-[95vw] mx-auto max-w-[1440px]">
      <div className="w-[95%] my-[50px]">{children}</div>
    </div>
  );
}
