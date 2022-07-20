import styled from "styled-components";
import type { FC } from "react";
import { useMemo } from "react";
import { ThemePreference, useTheme } from "@marcus-rise/react-theme";

const Button = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.neutral};

  &:hover {
    cursor: pointer;
  }
`;

const ThemeToggle: FC = () => {
  const { preferences, toggleTheme } = useTheme();

  const { icon, title } = useMemo(() => {
    let meta: { icon: string; title: string };

    switch (preferences) {
      case ThemePreference.LIGHT: {
        meta = { title: "Light", icon: "☀︎" };
        break;
      }
      case ThemePreference.DARK: {
        meta = { title: "Dark", icon: "☾" };
        break;
      }
      case ThemePreference.SYSTEM:
      default: {
        meta = { title: "System", icon: "☾/☀" };
        break;
      }
    }

    return meta;
  }, [preferences]);

  return (
    <Button onClick={toggleTheme} title={title}>
      {icon}
    </Button>
  );
};

export { ThemeToggle };
