import type { ComponentMeta, ComponentStory } from "@storybook/react";
import Home from "../../../pages/index";
import { useEffect, useState } from "react";
import { TRANSACTION_DATA_MOCK } from "../../transaction/transactions-data.mock";
import { TRANSACTION_LOCAL_STORAGE_KEY } from "../../transaction/repository/transaction-local-storage.repository";
import { UserProvider } from "../../user";

const Config: ComponentMeta<typeof Home> = {
  title: "pages/Home",
  component: Home,
  decorators: [
    (Story) => (
      <UserProvider>
        <Story />
      </UserProvider>
    ),
  ],
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

const UploadData = WithData.bind({});
UploadData.parameters = {
  nextRouter: {
    path: "/",
    query: {
      uploadData: "true",
    },
  },
};

export default Config;
export { Default, WithData, UploadData };
