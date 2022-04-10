import type { FC, InputHTMLAttributes } from "react";

type InputTextProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const InputText: FC<InputTextProps> = (props) => {
  return <input type={"text"} {...props} />;
};

export { InputText };
