import type { FC } from "react";
import styled from "styled-components";
import type { ForgotPasswordFormDto } from "./forgot-password-form.dto";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "../../../components/input-text";
import { Icon } from "../../../components/icon";
import { Button } from "../../../components/button";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

type ForgotPasswordFormProps = {
  onSubmit(dto: ForgotPasswordFormDto): void;
  loading?: boolean;
};

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({ onSubmit, loading }) => {
  const { control, handleSubmit } = useForm<ForgotPasswordFormDto>({
    defaultValues: {
      login: "",
    },
  });

  const submit: SubmitHandler<ForgotPasswordFormDto> = (dto) => {
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
      <Button type={"submit"} loading={loading}>
        Сбросить пароль
      </Button>
    </Form>
  );
};

export { ForgotPasswordForm };
