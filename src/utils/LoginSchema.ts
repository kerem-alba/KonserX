import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Gecersiz email").required("Zorunlu Alan"),
  password: Yup.string().min(6, "en az 6 karakterli olmali").max(10, "en fazla 10 karakterli olmali").required("Zorunlu alan"),
});
