import type { FC } from "react";
import styled, { useTheme } from "styled-components";
import { Card } from "../../../components/card";
import { Button } from "../../../components/button";

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  text-align: center;
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

type UploadDataDialogProps = { onAgree: () => void; onDisagree: () => void };

const UploadDataDialog: FC<UploadDataDialogProps> = ({ onDisagree, onAgree }) => {
  const theme = useTheme();

  return (
    <StyledCard>
      <Title>Выгрузить данные на сервер?</Title>
      <Actions>
        <Button color={theme.primary} onClick={onAgree}>
          Да
        </Button>
        <Button color={theme.danger} onClick={onDisagree}>
          Нет
        </Button>
      </Actions>
    </StyledCard>
  );
};

export { UploadDataDialog };
