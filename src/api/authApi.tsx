import { api_header_register } from "../utils/constants";
import { BASE_URL } from "../config/localhostConfig";

interface RequestBody {
  email: string;
  password: string;
}

export const loginService = async (body: RequestBody) => {
  try {
    console.log("LoginService:", body);
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: api_header_register(),
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log("Token:", data.token);
    console.log("Data:", data);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Giriş sırasında bir hata oluştu");
    }
    return data;
  } catch (error) {
    console.error("Login Hatası:", error);
    throw error;
  }
};

export const registerService = async (body: RequestBody) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: api_header_register(),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Kayıt sırasında bir hata oluştu");
    }
    return true;
  } catch (error) {
    console.error("Register Hatası:", error);
    throw error;
  }
};
