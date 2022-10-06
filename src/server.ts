import app from "./app";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.SERVER_PORT;

async function startExpressServer() {
  try {
    app.listen(PORT, () => console.log(`Express App Listening on Port ${PORT}`));
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}

startExpressServer();