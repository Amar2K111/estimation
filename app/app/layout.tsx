import AppNavigation from "@/components/AppNavigation";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppNavigation />
      <main className="pt-20">
        {children}
      </main>
    </>
  );
}

