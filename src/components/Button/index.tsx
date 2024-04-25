import { ReactNode } from "react";
import { ButtonUI } from "./styles";

interface IButton {
  variant: "text" | "outlined" | "contained";
  children?: ReactNode;
  onClick?: any;
  startIcon?: any;
  disabled?: any;
  onSubmit?: any;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  style?: Object;
}

const Button: React.FC<IButton> = ({
  variant,
  style,
  children,
  color,
  startIcon,
  onClick,
  onSubmit,
  disabled,
}) => {
  return (
    <ButtonUI
      variant={variant}
      style={style}
      color={color}
      startIcon={startIcon}
      onClick={onClick}
      onSubmit={onSubmit}
      disabled={disabled}
    >
      {children}
    </ButtonUI>
  );
};

export default Button;
