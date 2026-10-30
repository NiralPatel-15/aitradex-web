import Navbar from "@/components/landing/Navbar/Navbar";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <SignupForm />
      </main>
    </div>
  );
}
