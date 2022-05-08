import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import type { IAuthLoginFormDto } from "./auth-login-form.dto";
import styled from "styled-components";
import { InputText } from "../../../components/input-text";
import { Button } from "../../../components/button";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

type AuthLoginFormProps = {
  onSubmit: (dto: IAuthLoginFormDto) => void;
};

const AuthLoginForm: FC<AuthLoginFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<IAuthLoginFormDto>();

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
          <InputText {...field} label={"Логин"} error={fieldState.error?.message} />
        )}
      />
      <Controller
        control={control}
        name={"password"}
        rules={{ required: "Введите пароль" }}
        render={({ field, fieldState }) => (
          <InputText {...field} label={"Пароль"} password error={fieldState.error?.message} />
        )}
      />
      <Button type={"submit"}>Войти</Button>
    </Form>
  );
};

export { AuthLoginForm };
