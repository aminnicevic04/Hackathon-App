"use client";

import Button from "../../../components/shared/form/Button";
import Input from "../../../components/shared/form/Input";
import useForm from "../../../lib/hooks/useForm";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../../lib/validation";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";

const LoginForm = () => {
  const { formState, inputChangeHandler } = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const router = useRouter();

  async function loginAction(e) {
    e.preventDefault();

    if (!formState.isValid) return;

    try {
      const result = await signIn("credentials", {
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.ok) {
        router.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <form
        id="forma"
        className="p-0 flex flex-col gap-8 w-[80%] max-md:w-fit"
        onSubmit={loginAction}
      >
        <div className="flex flex-col items-center" id="wellcome-title">
          <h1>Nice to see you!</h1>
          <h3>Enter your email and password to sign in</h3>
        </div>
        <ToastContainer />
        <div className="flex flex-col gap-6">
          <Input
            elementType={"input"}
            id={"email"}
            type={"email"}
            label="Email"
            placeholder={"Enter Email"}
            validators={[VALIDATOR_EMAIL()]}
            onInputChange={inputChangeHandler}
            initialValidity={false}
            helperText="Please enter a valid email address."
          />
          <Input
            elementType={"input"}
            id={"password"}
            type={"password"}
            label="Password"
            placeholder={"Enter Password"}
            validators={[VALIDATOR_MINLENGTH(8)]}
            onInputChange={inputChangeHandler}
            initialValidity={false}
            helperText="Please enter a valid password."
          />
        </div>
        <div>
          <Button
            variant="primary"
            type="submit"
            disabled={!formState.isValid}
            className="btn"
          >
            Log In
          </Button>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-gray-400 text-center">Don't have an account?</p>
          <Link href="/signup" className="text-white">
            Sign in
          </Link>
        </div>
        <p className="text-gray-400 text-center">
          Made by team UTUN on Hackathon 2023 👨🏽‍💻
        </p>
      </form>
    </>
  );
};

export default LoginForm;
