import type { FC } from "react";
import { useState } from "react";
import styled from "styled-components";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "../../../components/input-text";
import { Button, ButtonVariant } from "../../../components/button";
import type { ChangePasswordFormDto } from "./change-password-form.dto";
import { passwordLengthValidator } from "../../helpers";
import { Icon } from "../../../components/icon";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

type ChangePasswordFormProps = {
  onSubmit: SubmitHandler<ChangePasswordFormDto>;
  loading?: boolean;
};

const ChangePasswordForm: FC<ChangePasswordFormProps> = ({ onSubmit, loading }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((show) => !show);

  const { control, handleSubmit, getValues } = useForm<
    ChangePasswordFormDto & { rePassword: string }
  >({
    defaultValues: {
      password: "",
      rePassword: "",
    },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name={"password"}
        rules={{ required: "Введите пароль", validate: passwordLengthValidator }}
        render={({ field, fieldState }) => (
          <InputText
            {...field}
            label={"Пароль"}
            error={fieldState.error?.message}
            startIcon={<Icon name={"lock"} />}
            password={!showPassword}
            endIcon={
              <Button
                type={"button"}
                variant={ButtonVariant.ICON}
                color={"inherit"}
                onClick={toggleShowPassword}
                tabIndex={-1}
              >
                <Icon hoverable name={showPassword ? "eye-off" : "eye"} />
              </Button>
            }
          />
        )}
      />
      <Controller
        control={control}
        name={"rePassword"}
        rules={{
          required: "Введите повторно пароль",
          validate: (value) => getValues("password") === value || "Пароли не совпадают",
        }}
        render={({ field, fieldState }) => (
          <InputText
            {...field}
            label={"Повторить пароль"}
            error={fieldState.error?.message}
            password={!showPassword}
            startIcon={<Icon name={"lock"} />}
            endIcon={
              <Button
                type={"button"}
                variant={ButtonVariant.ICON}
                color={"inherit"}
                onClick={toggleShowPassword}
                tabIndex={-1}
              >
                <Icon hoverable name={showPassword ? "eye-off" : "eye"} />
              </Button>
            }
          />
        )}
      />
      <Button type={"submit"} isLoading={loading}>
        Сменить пароль
      </Button>
    </Form>
  );
};

export { ChangePasswordForm };
export type { ChangePasswordFormProps };
