"use client";

import { Input } from "@/components/input";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import LoadingMarvel from "@/components/loading-marvel";

export default function Login() {
  const { t } = useTranslation();
  const router = useRouter();
  const { loading, login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  async function onSubmit(data: any) {
    const response = await login(data.username, data.password);
    if (response.error && response.error.response) {
      const errorData = response.error.response.data as { message: string };
      setError("username", {
        type: "manual",
        message: t(errorData?.message),
      });
      setError("password", {
        type: "manual",
        message: t(errorData?.message),
      });
    }
  }

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-black overflow-auto">
      <LoadingMarvel loading={loading} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 p-6 border border-2 border-outline rounded max-w-md w-full mx-4"
      >
        <span className="text-[7rem] marvel-marvel-logo text-center mx-auto pb-8">
          <span className="path1" />
          <span className="path2" />
          <span className="path3" />
          <span className="path4" />
        </span>
        <div className="flex flex-col gap-4">
          <Input
            label={t("username")}
            variable="white"
            disabled={loading}
            caption={
              errors.username
                ? {
                    type: "error",
                    value: true,
                    message: errors.username.message as string,
                  }
                : {
                    type: "info",
                    value: true,
                    message: t("username_info_caption"),
                  }
            }
            {...register("username", {
              required: t("username_required"),
            })}
          />
          <Input
            type="password"
            label={t("password")}
            variable="white"
            disabled={loading}
            caption={
              errors.password
                ? {
                    type: "error",
                    value: true,
                    message: errors.password.message as string,
                  }
                : {
                    type: "info",
                    value: true,
                    message: t("password_info_caption"),
                  }
            }
            {...register("password", { required: t("password_required") })}
          />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <button
            type="submit"
            disabled={loading}
            className="font-roboto font-semibold text-xl p-2 bg-primary text-white hover:bg-primary-hover active:bg-primary-active"
          >
            {t("login")}
          </button>
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={() => {
                router.push("/auth/register");
              }}
              className="w-fit font-roboto font-semibold text-md p-2 text-white underline hover:text-primary-hover active:text-primary-active"
            >
              {t("register")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
