import { AuthGuard } from "@/components/custom/auth/auth-guard";

export default function DashboardLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="relative min-h-screen">
        {children}
        {modal}
      </div>
    </AuthGuard>
  );
}
