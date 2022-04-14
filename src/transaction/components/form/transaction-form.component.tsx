import type {FC} from "react";
import {useCallback} from "react";
import {InputText} from "../../../components/input-text";
import {InputPrice} from "../../../components/input-price";
import {Button} from "../../../components/button";
import type {SubmitHandler} from "react-hook-form";
import {useForm, Controller} from "react-hook-form";
import type {ITransactionFormDto} from "../dto";
import {InputError} from "../../../components/input-error";
import styled from "styled-components";

const InputContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

type TransactionFormProps = {
  onSubmit: (dto: ITransactionFormDto) => void;
};

const TransactionForm: FC<TransactionFormProps> = ({onSubmit}) => {
  const {handleSubmit, control} = useForm<ITransactionFormDto>({
    defaultValues: {
      amount: "" as unknown as number,
      title: ""
    }
  });

  const submit: SubmitHandler<ITransactionFormDto> = useCallback((dto) => {
    onSubmit(dto)
  }, [onSubmit]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Controller
        name={"title"}
        control={control}
        rules={{required: "Введите название"}}
        render={({field, fieldState}) => {
          return <InputContainer>
            <InputText {...field} placeholder={"Название"}/>
            {fieldState.error && <InputError>{fieldState.error.message}</InputError>}
          </InputContainer>
        }}
      />
      <Controller
        name={"amount"}
        control={control}
        rules={{required: "Введите сумму"}}
        render={({field, fieldState}) => {
          return <InputContainer>
            <InputPrice {...field} placeholder={"Сумма"}/>
            {fieldState.error && <InputError>{fieldState.error.message}</InputError>}
          </InputContainer>
        }}
      />
      <Button type={"submit"}>Добавить</Button>
    </form>
  );
};

export {TransactionForm};
export type {TransactionFormProps}
