import { StyledButton } from "./styles";

export const Button = ({ label, onClick, id, disabled }) => {
  return (
    <StyledButton
      clicked={label}
      disabledStatus={disabled}
      id={id}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </StyledButton>
  );
};
