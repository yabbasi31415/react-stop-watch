import styled from "styled-components";

export const StyledButton = styled.button`
  color: white;
  font-weight: bold;
  border-radius: 50%;
  padding: 50px;
  text-align: center;
  display: inline-block;
  font-size: 24px;
  margin: 4px 8px;

  background-color: ${(props) => setColor(props.clicked, props.disabled)};
`;

function setColor(buttonName, status) {
  if (status) {
    return "lightgray";
  } else {
    switch (buttonName) {
      case "Start":
        return "green";
      case "Pause":
        return "purple";
      case "Split":
        return "orange";
      case "Reset":
        return "blue";
      default: 
      return "lightgray";
    }
  }
}

export const Div = styled.div`
  display: inline-flex;
  margin-bottom: 50px;
`;
