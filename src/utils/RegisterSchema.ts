import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Geçersiz email").required("Email zorunlu bir alandır"),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakterli olmalıdır")
    .max(10, "Şifre en fazla 10 karakterli olmalıdır")
    .required("Şifre zorunlu bir alandır"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Şifreler eşleşmiyor")
    .required("Şifre onayı zorunludur"),
});
