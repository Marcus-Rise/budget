import type { FC } from "react";
import { useCallback } from "react";
import { InputText } from "../../../components/input-text";
import { InputNumber } from "../../../components/input-number";
import { Button } from "../../../components/button";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import type { ITransactionFormQuickDto } from "./transaction-form-quick.dto";
import styled from "styled-components";
import { media } from "../../../../styles/grid";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  ${media.md} {
    flex-direction: row;
  }
`;

type TransactionFormProps = {
  onSubmit: (dto: ITransactionFormQuickDto) => void;
};

const TransactionFormQuick: FC<TransactionFormProps> = ({ onSubmit }) => {
  const { handleSubmit, control, reset } = useForm<ITransactionFormQuickDto>({
    defaultValues: {
      amount: "" as unknown as number,
      title: "",
    },
  });

  const submit: SubmitHandler<ITransactionFormQuickDto> = useCallback(
    (dto) => {
      onSubmit(dto);

      reset();
    },
    [onSubmit, reset],
  );

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Controller
        name={"title"}
        control={control}
        rules={{ required: "Введите название" }}
        render={({ field, fieldState }) => (
          <InputText {...field} label={"Название"} autoFocus error={fieldState.error?.message} />
        )}
      />
      <Controller
        name={"amount"}
        control={control}
        rules={{
          required: "Введите сумму",
          min: { value: 1, message: "Введите положительное число" },
        }}
        render={({ field, fieldState }) => (
          <InputNumber {...field} min={1} label={"Сумма"} error={fieldState.error?.message} />
        )}
      />
      <Button type={"submit"}>Добавить</Button>
    </Form>
  );
};

export { TransactionFormQuick };
export type { TransactionFormProps };
