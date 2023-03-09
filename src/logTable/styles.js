import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: repeat(3, 1fr);
`;

export const GridEntry = styled.div`
  text-align: center;
  font-size: 20px;

  color: ${(props) =>
    props.color ? (props.color === "Pause" ? "darkmagenta" : "darkorange") : "black"};
`;
