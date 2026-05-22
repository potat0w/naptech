import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { logEmailStatus, verifySmtpOnStartup } from "./config/email-status.js";

const app = createApp();

app.listen(env.port, () => {
  console.log(`Naptec API listening on http://localhost:${env.port}`);
  logEmailStatus();
  void verifySmtpOnStartup();
});
