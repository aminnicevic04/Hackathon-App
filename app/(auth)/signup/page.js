import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../lib/session";
import SignupForm from "../../../components/auth/signup/SignupForm";

const SignupPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return (
    <section className="flex h-screen overflow-x-hidden">
      <div className="basis-1/2 bg-blue-400 grow"></div>
      <div className="basis-[40em] flex justify-center items-center p-16">
        <SignupForm />
      </div>
    </section>
  );
};

export default SignupPage;
