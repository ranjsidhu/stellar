import { ComponentChildren } from "@/app/types";

export function POverride({ children }: ComponentChildren) {
  return <p className="text-sm poverride">{children}</p>;
}

export function TitleOverride({ children }: ComponentChildren) {
  return <p className="text-sm font-bold">{children}</p>;
}

export function SpanSmallTextOverride({ children }: ComponentChildren) {
  return <span className="text-sm">{children}</span>;
}

export function DivSmallTextOverride({ children }: ComponentChildren) {
  return <div className="text-sm">{children}</div>;
}
