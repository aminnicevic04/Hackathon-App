"use client";
import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Delete } from "@mui/icons-material";
import { deleteDevices } from "../../../lib/actions/user.actions";
import { getUserAuthId } from "../../../lib/functions";

const DevicesList = ({ devices }) => {
  const [deviceStates, setDeviceStates] = useState(devices.map(() => false));
  const userIdAuth = getUserAuthId();

  const handleToggle = (index) => {
    setDeviceStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <table className="min-w-full card rounded-xl p-3">
      <thead>
        <tr>
          <th className="py-2 px-4 text-white font-bold text-left">
            Naziv Uredjaja
          </th>
          <th className="py-2 px-4 text-white font-bold text-left">
            Model Uredjaja
          </th>
          <th className="py-2 px-4 text-white font-bold text-left">
            Potrosnja Energije
          </th>
          <th className="py-2 px-4 text-white font-bold text-left">
            Iskljuci | Ukljuci
          </th>
        </tr>
      </thead>
      <tbody>
        {devices.map((device, index) => (
          <tr key={device._id}>
            <td className="py-2 px-4 text-white">{device.naziv_uredjaja}</td>
            <td className="py-2 px-4 text-white">{device.model_uredjaja}</td>
            <td className="py-2 px-4 text-white">
              {device.potrosnja_energije} kW/h
            </td>
            <td className="py-2 px-4">
              <FormControlLabel
                control={
                  <Switch
                    checked={deviceStates[index]}
                    onChange={() => handleToggle(index)}
                  />
                }
                label={
                  <span style={{ color: "white" }}>
                    {deviceStates[index] ? "Ukljuceno" : "Iskljuceno"}
                  </span>
                }
              />
            </td>
            <td>
              <button
                onClick={async () => {
                  const confirm = window.confirm(
                    "Da li ste sigurni da zelite da izbrisete uredjaj?"
                  );

                  if (confirm) {
                    await deleteDevices(userIdAuth, device._id);
                  }
                }}
              >
                <Delete style={{ color: "red" }} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DevicesList;
