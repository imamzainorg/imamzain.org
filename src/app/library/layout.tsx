export default function LibraryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="md:container mx-auto pb-10">{children}</div>;
}
