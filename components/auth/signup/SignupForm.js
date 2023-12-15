"use client";

import Button from "../../../components/shared/form/Button";
import Input from "../../../components/shared/form/Input";
import { signup } from "../../../lib/actions/user.actions";
import useForm from "../../../lib/hooks/useForm";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../../lib/validation";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";

const SignupForm = () => {
  const { formState, inputChangeHandler } = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      username: {
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
  const { name, email, username, password } = formState.inputs;
  const router = useRouter();

  async function signupAction(e) {
    e.preventDefault();

    if (!formState.isValid) return;

    try {
      const response = await signup(
        name.value,
        email.value,
        username.value,
        password.value
      );

      if (response.message === "User created.") {
        router.push("/login");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col p-8">
      <ToastContainer />
      <div>
        <div>
          <h2 className="section_title_smaller text-white text-center">
            Register
          </h2>
        </div>
        <div>
          <p></p>
        </div>
      </div>
      <form className="flex flex-col gap-8 w-80 " onSubmit={signupAction}>
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
            id={"name"}
            type={"text"}
            label="Name"
            placeholder={"Enter Name"}
            validators={[VALIDATOR_MINLENGTH(3)]}
            onInputChange={inputChangeHandler}
            initialValidity={false}
            helperText="Please enter a valid name."
          />
          <Input
            elementType={"input"}
            id={"username"}
            type={"text"}
            label="Username"
            placeholder={"Enter Username"}
            validators={[VALIDATOR_MINLENGTH(3)]}
            onInputChange={inputChangeHandler}
            initialValidity={false}
            helperText="Please enter a valid username"
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
          <Button variant="primary" type="submit" disabled={!formState.isValid}>
            Sign Up
          </Button>
        </div>
      </form>
      <div className="flex gap-2 justify-center">
        <p className="text-gray-400 text-center">Already have an account?</p>
        <Link href="/login" className="text-white">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
