import * as React from "react";
import "./notification.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function BasicAlerts() {
  return (
    <div>
      <Stack sx={{ width: "100%" }} spacing={4}>
        <Alert severity="error">
          Ušli ste u crvenu zonu potrošnje električne energije!
        </Alert>
        <Alert severity="warning">
          Sve ste bliži crvenoj zoni potrošnje električne energije!
        </Alert>
        <Alert severity="success">
          Nalazite se u zelenoj zoni potrošnje električne energije.
        </Alert>
      </Stack>
    </div>
  );
}
