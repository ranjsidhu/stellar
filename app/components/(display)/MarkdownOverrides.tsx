export function POverride({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <p className="text-sm poverride">{children}</p>;
}

export function TitleOverride({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <p className="text-sm font-bold">{children}</p>;
}

export function SpanSmallTextOverride({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <span className="text-sm">{children}</span>;
}

export function DivSmallTextOverride({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="text-sm">{children}</div>;
}
