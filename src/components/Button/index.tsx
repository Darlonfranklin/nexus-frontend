import { ReactNode, MouseEvent } from "react";
import { ButtonUI } from "./styles";

interface IButton {
  variant: "text" | "outlined" | "contained";
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  startIcon?: ReactNode;
  disabled?: boolean;
  type?: "submit" | "reset";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | undefined;
  style?: React.CSSProperties;
}

const Button: React.FC<IButton> = ({
  variant,
  style,
  children,
  color,
  startIcon,
  onClick,
  disabled,
  type,
}) => {
  return (
    <ButtonUI
      variant={variant}
      style={style}
      color={color}
      startIcon={startIcon}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </ButtonUI>
  );
};

export default Button;
