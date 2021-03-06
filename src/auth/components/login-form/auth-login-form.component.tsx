import type { FC } from "react";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import type { IAuthLoginFormDto } from "./auth-login-form.dto";
import styled from "styled-components";
import { InputText } from "../../../components/input-text";
import { Button, ButtonVariant } from "../../../components/button";
import { Icon } from "../../../components/icon";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

type AuthLoginFormProps = {
  onSubmit: (dto: IAuthLoginFormDto) => void;
  loading?: boolean;
};

const AuthLoginForm: FC<AuthLoginFormProps> = ({ onSubmit, loading }) => {
  const { control, handleSubmit } = useForm<IAuthLoginFormDto>({
    defaultValues: {
      login: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((show) => !show);

  const submit: SubmitHandler<IAuthLoginFormDto> = (dto) => {
    onSubmit(dto);
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Controller
        control={control}
        name={"login"}
        rules={{ required: "Введите логин" }}
        render={({ field, fieldState }) => (
          <InputText
            {...field}
            label={"Логин"}
            startIcon={<Icon name={"account"} />}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name={"password"}
        rules={{ required: "Введите пароль" }}
        render={({ field, fieldState }) => (
          <InputText
            {...field}
            label={"Пароль"}
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
            error={fieldState.error?.message}
          />
        )}
      />
      <Button type={"submit"} isLoading={loading}>
        Войти
      </Button>
    </Form>
  );
};

export { AuthLoginForm };
