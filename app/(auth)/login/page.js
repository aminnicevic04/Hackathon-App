import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../lib/session";
import LoginForm from "../../../components/auth/login/LoginForm";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return (
    <section className="lg:flex h-screen overflow-x-hidden">
      <div className="basis-1/2 bg-blue-400 grow login-bg"></div>
      <div className="basis-[40em] flex justify-center items-center p-16">
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
