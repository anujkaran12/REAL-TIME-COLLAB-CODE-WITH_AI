import axios from "axios";
import { ILanguagesVersion, LANGUAGE_VERSIONS } from "./constants";

export const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});



