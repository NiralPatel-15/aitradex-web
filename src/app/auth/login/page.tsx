import Navbar from "@/components/landing/Navbar/Navbar";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <LoginForm />
      </main>
    </div>
  );
}
