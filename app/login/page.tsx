import LoginAside from "@/components/custom/login/login-aside";
import LoginCard from "@/components/custom/login/login-card";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <LoginAside />
      <LoginCard />
    </div>
  );
}
