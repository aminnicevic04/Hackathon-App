import React from "react";
import Notification from "../../../components/auth/notification/Notification";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="heading">Obaveštenja</h1>
      <div className="flex flex-col justify-center h-80 rounded-lg border border-solid border-light-gray-300 bg-gray-300 bg-opacity-30 notify p-4">
        <Notification />
      </div>
    </div>
  );
}
