import { StyledButton } from "./styles";

export const Button = ({ label, onClick, id, disabled }) => {
  return (
    <StyledButton
      clicked={label}
      id={id}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </StyledButton>
  );
};
