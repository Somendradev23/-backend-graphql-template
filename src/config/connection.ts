const mongoose = require("mongoose");
const yenv = require("yenv");
const env = yenv("env.yaml", { env: "development" });
mongoose.set("strictQuery", true);
const dbUri = env.DATABASE_BASE_URL;
mongoose
  .connect(dbUri)
  .then(() => console.log("Database is connected")) // eslint-disable-line no-console
  .catch((err: any) => console.log("Could not connect to MongoDB", err)); // eslint-disable-line no-console
