import type { ComponentMeta, ComponentStory } from "@storybook/react";
import Home from "../../../pages/index";
import { useEffect, useState } from "react";
import { TRANSACTION_LOCAL_STORAGE_KEY } from "../../transaction/transaction.hook";
import { TRANSACTION_DATA_MOCK } from "../../transaction/transactions-data.mock";

const Config: ComponentMeta<typeof Home> = {
  title: "pages/Home",
  component: Home,
};

const Default: ComponentStory<typeof Home> = (args) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      localStorage.removeItem(TRANSACTION_LOCAL_STORAGE_KEY);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  if (!isInitialized) {
    return <></>;
  }

  return <Home {...args} />;
};

const WithData: ComponentStory<typeof Home> = (args) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      localStorage.setItem(TRANSACTION_LOCAL_STORAGE_KEY, JSON.stringify(TRANSACTION_DATA_MOCK));
      setIsInitialized(true);
    }
  }, [isInitialized]);

  return isInitialized ? <Home {...args} /> : <></>;
};

export default Config;
export { Default, WithData };
