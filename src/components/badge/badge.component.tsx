import styled from "styled-components";

const Badge = styled.span<{ color?: Color }>`
  background-color: ${(props) => props.color ?? props.theme.neutralLighter};
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  color: ${(props) => props.theme.neutral};
`;

export { Badge };
