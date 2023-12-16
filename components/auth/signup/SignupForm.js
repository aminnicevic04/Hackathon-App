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
    <div className="flex flex-col">
      <ToastContainer />
      <div>
        <div>
          <h2
            className={`section_title_smaller text-white text-center p-4 max-md:p-0`}
          >
            Registracija
          </h2>
        </div>
        <div>
          <p></p>
        </div>
      </div>
      <form className="flex flex-col gap-8" onSubmit={signupAction}>
        <div className="flex flex-col gap-6">
          <Input
            elementType={"input"}
            id={"email"}
            type={"email"}
            label="E-mail"
            placeholder={"Unesite E-mail"}
            validators={[VALIDATOR_EMAIL()]}
            onInputChange={inputChangeHandler}
            initialValidity={false}
            helperText="Molimo vas unesite validnu e-mail adresu."
          />
          <Input
            elementType={"input"}
            id={"name"}
            type={"text"}
            label="Ime"
            placeholder={"Unesite ime"}
            validators={[VALIDATOR_MINLENGTH(3)]}
            onInputChange={inputChangeHandler}
            initialValidity={false}
            helperText="Molimo vas unesite validno ime."
          />
          <Input
            elementType={"input"}
            id={"username"}
            type={"text"}
            label="Korisničko ime"
            placeholder={"Unesite korisničko ime"}
            validators={[VALIDATOR_MINLENGTH(3)]}
            onInputChange={inputChangeHandler}
            initialValidity={false}
            helperText="Molimo vas unesite validno korisničko ime."
          />
          <Input
            elementType={"input"}
            id={"password"}
            type={"password"}
            label="Lozinka"
            placeholder={"Unesite lozinku"}
            validators={[VALIDATOR_MINLENGTH(8)]}
            onInputChange={inputChangeHandler}
            initialValidity={false}
            helperText="Molimo vas unesite validnu lozinku."
          />
        </div>
        <div>
          <Button variant="primary" type="submit" disabled={!formState.isValid}>
            Registruj se
          </Button>
        </div>
      </form>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex gap-2 justify-center">
          <p className="text-gray-400 text-center">Već imate nalog?</p>
          <Link href="/login" className="text-white">
            Ulogujte se
          </Link>
        </div>
        <p className="text-gray-400 text-center">
          Made by team UTUN on Hackathon 2023 👨🏽‍💻
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
