import express, { Router } from "express";
import { privacyPolicy } from "../controller/privacy-policy/privacyPolicy";

const route: Router = express.Router();
route.get("/privacy-policy", privacyPolicy.PP);
route.post("/createUserByProvider", privacyPolicy.createUserByProvider);

export default route;
