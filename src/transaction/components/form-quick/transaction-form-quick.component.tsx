import type { FC } from "react";
import { useCallback } from "react";
import { InputText } from "../../../components/input-text";
import { InputPrice } from "../../../components/input-price";
import { Button } from "../../../components/button";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import type { ITransactionFormQuickDto } from "./transaction-form-quick.dto";
import { InputError } from "../../../components/input-error";
import styled from "styled-components";

const InputContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
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
    <form onSubmit={handleSubmit(submit)}>
      <Controller
        name={"title"}
        control={control}
        rules={{ required: "Введите название" }}
        render={({ field, fieldState }) => (
          <InputContainer>
            <InputText {...field} placeholder={"Название"} />
            {!!fieldState.error?.message && <InputError>{fieldState.error.message}</InputError>}
          </InputContainer>
        )}
      />
      <Controller
        name={"amount"}
        control={control}
        rules={{ required: "Введите сумму" }}
        render={({ field, fieldState }) => (
          <InputContainer>
            <InputPrice {...field} placeholder={"Сумма"} />
            {!!fieldState.error?.message && <InputError>{fieldState.error.message}</InputError>}
          </InputContainer>
        )}
      />
      <Button type={"submit"}>Добавить</Button>
    </form>
  );
};

export { TransactionFormQuick };
export type { TransactionFormProps };
