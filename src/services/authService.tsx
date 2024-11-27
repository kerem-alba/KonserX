import { api_header } from "../utils/constants";
import { BASE_URL } from "../config/localhostConfig";

interface RequestBody {
  email: string;
  password: string;
}

export const loginService = async (body: RequestBody) => {
  const response = await fetch(`${BASE_URL}auth/login`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: api_header(),
  });
  return response.json();
};
