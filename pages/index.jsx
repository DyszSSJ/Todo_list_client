import Link from "next/link";
import { setLocal } from "@/assets/localStorage";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { loginShema } from "@/schema";
import { useFormik } from "formik";
import { AUTENTICAR_USUARIO } from "@/schema/gql/QuerysAndMutations";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getLocal } from "@/assets/localStorage";

export default function Home() {
  const [login] = useMutation(AUTENTICAR_USUARIO);
  const router = useRouter();

  useEffect(() => {
    const token = getLocal("token");
    if (token) {
      router.push("/inicio");
    }
  }, [router]);

  const onSubmit = async (values) => {
    const { email, password } = values;
    try {
      const { data } = await login({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      toast.success("Iniciaste sesión correctamente");
      const { token } = data.login;
      setLocal("token", token);

      setTimeout(() => {
        router.push("/inicio");
      }, 100);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { handleChange, errors, touched, handleBlur, values, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginShema,
      onSubmit,
    });
    

  return (
    <div className="bg-[#18a49d] h-[100vh] lg:pt-[10rem] md:pt-[8rem] pt-[7rem]">
      <div className="border-l-8 border-[#85e2d8] md:h-[56vh] h-[57vh] md:w-[500px] w-[250px] m-auto md:pl-12 pl-8">
        <h1 className="text-white font-bold xl:text-[2.5rem] md:text-[1.5rem] text-[1.2rem] text-center">
          Iniciar Sesión
        </h1>
        <div>
          <form action="" onSubmit={handleSubmit}>
            <div className="mt-8">
              <input
                type="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.email && touched.email
                    ? "w-full error"
                    : "w-full xl:border-8 xl:border-[#85e2d8] border-4 border-[#85e2d8] p-2"
                }
                placeholder="Correo Eléctronico"
              />
              {errors.email && touched.email && (
                <div className="flex items-end gap-2 -mb-4">
                  <p className="errorParrafo">{errors.email}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgb(197, 0, 0)"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="mt-8">
              <input
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.password && touched.password
                    ? "w-full error"
                    : "w-full xl:border-8 xl:border-[#85e2d8] border-4 border-[#85e2d8] p-2"
                }
                placeholder="Contraseña"
              />
              {errors.password && touched.password && (
                <div className="flex items-end gap-2 -mb-4">
                  <p className="errorParrafo">{errors.password}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgb(197, 0, 0)"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="mt-[1.5rem] text-center text-white md:text-[1.2rem] font-bold">
              ¿No tienes una cuenta?{" "}
              <span className="text-black ml-2 font-normal hover:border-b-2 transition-all ease-in-out border-black">
                <Link href="/register">Registrate</Link>
              </span>
            </div>
            <div>
              <button
                type="submit"
                className="bg-[#7ac4c9] hover:bg-[#68afb4] transition-all ease-in-out xl:mt-[3.5rem] mt-[1.5rem] w-full py-2 xl:text-[1.5rem] text-white"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
