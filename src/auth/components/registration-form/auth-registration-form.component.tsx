import type { FC } from "react";
import { useState } from "react";
import styled from "styled-components";
import type { IAuthRegistrationFormDto } from "./auth-registration-form.dto";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "../../../components/input-text";
import { Icon } from "../../../components/icon";
import { Button, ButtonVariant } from "../../../components/button";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

type AuthRegistrationFormProps = {
  onSubmit: (dto: IAuthRegistrationFormDto) => void;
};

const AuthRegistrationForm: FC<AuthRegistrationFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<IAuthRegistrationFormDto>({
    defaultValues: {
      login: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((show) => !show);

  const submit: SubmitHandler<IAuthRegistrationFormDto> = (dto) => {
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
              >
                <Icon hoverable name={showPassword ? "eye-off" : "eye"} />
              </Button>
            }
            error={fieldState.error?.message}
          />
        )}
      />
      <Button type={"submit"}>Зарегистрироваться</Button>
    </Form>
  );
};

export { AuthRegistrationForm };
