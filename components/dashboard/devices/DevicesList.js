"use client";
import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { Delete } from "@mui/icons-material";
import { deleteDevices } from "../../../lib/actions/user.actions";
import { getUserAuthId } from "../../../lib/functions";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";

const ScheduleManager = ({ onAddSchedule }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleAddSchedule = () => {
    const schedule = {
      isEnabled,
      startTime,
      endTime,
    };

    onAddSchedule(schedule);

    // Reset form fields after adding a schedule
    setIsEnabled(false);
    setStartTime("");
    setEndTime("");
  };

  return (
    <div className="flex gap-3">
      <FormControlLabel
        control={
          <Checkbox
            checked={isEnabled}
            onChange={() => setIsEnabled(!isEnabled)}
          />
        }
        style={{ color: "#333", border: "#333", backgroundColor: "white" }}
        label="Enable Schedule"
      />
      <TextField
        label="Start Time"
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        style={{ color: "#333", border: "#333", backgroundColor: "white" }}
      />
      <TextField
        label="End Time"
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        style={{ color: "#333", border: "#333", backgroundColor: "white" }}
      />

      <Button variant="contained" onClick={handleAddSchedule}>
        Add Schedule
      </Button>
    </div>
  );
};

const DevicesList = ({ devices }) => {
  const [deviceStates, setDeviceStates] = useState(() => {
    const storedStates = JSON.parse(localStorage.getItem("deviceStates")) || [];
    return devices.map((device, index) => storedStates[index] || false);
  });

  const [deviceSchedules, setDeviceSchedules] = useState({});

  const userIdAuth = getUserAuthId();

  const handleToggle = (index) => {
    setDeviceStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      localStorage.setItem("deviceStates", JSON.stringify(newStates));
      return newStates;
    });
  };

  const handleAddSchedule = (schedule, deviceId) => {
    setDeviceSchedules((prevSchedules) => ({
      ...prevSchedules,
      [deviceId]: [...(prevSchedules[deviceId] || []), schedule],
    }));
  };

  useEffect(() => {
    const timers = [];

    const checkSchedules = (device, schedules) => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      schedules.forEach((schedule) => {
        const startTime =
          parseInt(schedule.startTime.split(":")[0]) * 60 +
          parseInt(schedule.startTime.split(":")[1]);
        const endTime =
          parseInt(schedule.endTime.split(":")[0]) * 60 +
          parseInt(schedule.endTime.split(":")[1]);

        if (currentTime >= startTime && currentTime <= endTime) {
          if (!deviceStates[devices.indexOf(device)]) {
            handleToggle(devices.indexOf(device));
          }
        } else {
          if (deviceStates[devices.indexOf(device)]) {
            handleToggle(devices.indexOf(device));
          }
        }
      });
    };

    devices.forEach((device, index) => {
      const schedules = deviceSchedules[device._id];

      if (schedules && schedules.length > 0) {
        checkSchedules(device, schedules);

        const timerId = setInterval(() => {
          checkSchedules(device, schedules);
        }, 60000);

        timers.push(timerId);
      }
    });

    return () => {
      timers.forEach((timerId) => clearInterval(timerId));
    };
  }, [deviceStates, devices, deviceSchedules]);

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
          <th className="py-2 px-4 text-white font-bold text-left">
            Zakazi Raspored
          </th>
          <th className="py-2 px-4 text-white font-bold text-left">Izbrisi</th>
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
              <ScheduleManager
                onAddSchedule={(schedule) =>
                  handleAddSchedule(schedule, device._id)
                }
              />
              {deviceSchedules[device._id] && (
                <ul>
                  {deviceSchedules[device._id].map((schedule, i) => (
                    <li key={i} className="text-white">
                      {`Raspored ${i + 1}: ${
                        schedule.isEnabled ? "Ukljuceno" : "Iskljuceno"
                      }, 
                        Pocetno Vreme: ${schedule.startTime}, Zavrsno Vreme: ${
                        schedule.endTime
                      }`}
                    </li>
                  ))}
                </ul>
              )}
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
