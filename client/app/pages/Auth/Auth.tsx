import { FC, useState } from "react";

import {
  FormProvider,
  RegisterOptions,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { FormButton, Input } from "@/forms";

import { Heading, Meta } from "@/ui";

import { useAuth, useAuthRedirect } from "@/hooks";

import { formRules } from "@/helpers";

import { IAuthForm } from "./Auth.interface";

import styles from "./Auth.module.scss";

export const Auth: FC = () => {
  // Auth
  useAuthRedirect();
  const { isLoading } = useAuth();

  // **Local state
  const [type, setType] = useState<"login" | "register">("login");

  // Form
  const methods = useForm<IAuthForm>({
    mode: "onChange",
  });

  const login = (data: IAuthForm) => {
    console.log("login", data);
  };
  const register = (data: IAuthForm) => {
    console.log("register", data);
  };

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    if (type === "login") login(data);
    if (type === "register") register(data);

    methods.reset();
  };

  return (
    <Meta title="Authorization">
      <section className={styles.wrapper}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Heading title="Auth" className="mb-6" />
            <Input
              label="E-mail"
              name="email"
              type="email"
              rules={
                {
                  ...formRules.required("Email is required!"),
                  ...formRules.email("Enter a valid email address!"),
                } as RegisterOptions
              }
            />
            <Input
              label="Password"
              name="password"
              type="password"
              rules={
                {
                  ...formRules.required("Password is required!"),
                  ...formRules.minLength(
                    6,
                    "Password must contain not less than 6 symbols!"
                  ),
                } as RegisterOptions
              }
            />
            <div className={styles.buttons}>
              <FormButton
                type="submit"
                onClick={() => setType("login")}
                disabled={isLoading}
              >
                Login
              </FormButton>
              <FormButton
                type="submit"
                onClick={() => setType("register")}
                disabled={isLoading}
              >
                Register
              </FormButton>
            </div>
          </form>
        </FormProvider>
      </section>
    </Meta>
  );
};
