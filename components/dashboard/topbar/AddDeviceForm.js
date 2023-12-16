"use client";
import Input from "../../../components/shared/form/Input";
import useForm from "../../../lib/hooks/useForm";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../lib/validation";
import Button from "../../shared/form/Button";
import { createDevices } from "../../../lib/actions/user.actions";
import { getUserAuthId } from "../../../lib/functions";

const AddDeviceForm = ({ closeDialog }) => {
  const { formState, inputChangeHandler, restartForm } = useForm(
    {
      naziv_uredjaja: {
        value: "",
        isValid: false,
      },
      model_uredjaja: {
        value: "",
        isValid: false,
      },
      potrosnja_energije: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const userIdAuth = getUserAuthId();

  async function createNewDevice(e) {
    e.preventDefault();

    try {
      if (!formState.isValid) {
        return;
      }

      const { naziv_uredjaja, model_uredjaja, potrosnja_energije } =
        formState.inputs;

      const response = await createDevices(
        userIdAuth,
        naziv_uredjaja.value,
        model_uredjaja.value,
        potrosnja_energije.value
      );

      if (response.message === "Success.") {
        restartForm(
          {
            naziv_uredjaja: {
              value: "",
              isValid: false,
            },
            model_uredjaja: {
              value: "",
              isValid: false,
            },
            potrosnja_energije: {
              value: "",
              isValid: false,
            },
          },
          false,
          "add_device"
        );
        closeDialog("add_devices");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      className="w-[400px] flex flex-col gap-7 pb-8 rounded-none"
      onSubmit={createNewDevice}
      id="add_device"
    >
      <div>
        <h2 className="text-lg text-white">Dodajte Novi Uredjaj</h2>
      </div>
      <Input
        elementType={"input"}
        id={"naziv_uredjaja"}
        type={"text"}
        label="Naziv Uredjaja"
        placeholder={"Unesite naziv uredjaja"}
        validators={[VALIDATOR_MINLENGTH(8)]}
        onInputChange={inputChangeHandler}
        initialValidity={false}
        helperText="Molimo vas unesite validan naziv uredjaja."
      />
      <Input
        elementType={"input"}
        id={"model_uredjaja"}
        type={"text"}
        label="Model Uredjaja"
        placeholder={"Unesite model uredjaja"}
        validators={[VALIDATOR_MINLENGTH(8)]}
        onInputChange={inputChangeHandler}
        initialValidity={false}
        helperText="Molimo vas unesite validan model uredjaja."
      />
      <Input
        elementType={"input"}
        id={"potrosnja_energije"}
        type={"number"}
        label="Potrosnja Energije kW/h"
        placeholder={"Unesite potrosnju energije uredjaja"}
        validators={[VALIDATOR_REQUIRE()]}
        onInputChange={inputChangeHandler}
        initialValidity={false}
        helperText="Molimo vas unesite validnu potrosnju energije uredjaja."
      />
      <div className="mt-7">
        <Button type={"submit"} disabled={!formState.isValid} variant="primary">
          Dodaj Uredjaj
        </Button>
      </div>
    </form>
  );
};

export default AddDeviceForm;
