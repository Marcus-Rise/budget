import type { FC } from "react";
import styled from "styled-components";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "../../../components/input-text";
import { Button } from "../../../components/button";
import type { ChangePasswordFormDto } from "./change-password-form.dto";
import { passwordLengthValidator } from "../../helpers";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

type ChangePasswordFormProps = {
  onSubmit(dto: ChangePasswordFormDto): void;
  loading?: boolean;
};

const ChangePasswordForm: FC<ChangePasswordFormProps> = ({ onSubmit, loading }) => {
  const { control, handleSubmit, getValues } = useForm<
    ChangePasswordFormDto & { rePassword: string }
  >({
    defaultValues: {
      password: "",
      rePassword: "",
    },
  });

  const submit: SubmitHandler<ChangePasswordFormDto> = ({ password }) => {
    onSubmit({ password });
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Controller
        control={control}
        name={"password"}
        rules={{ required: "Введите пароль", validate: passwordLengthValidator }}
        render={({ field, fieldState }) => (
          <InputText {...field} label={"Пароль"} error={fieldState.error?.message} />
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
          <InputText {...field} label={"Повторить пароль"} error={fieldState.error?.message} />
        )}
      />
      <Button type={"submit"} isLoading={loading}>
        Сбросить пароль
      </Button>
    </Form>
  );
};

export { ChangePasswordForm };
