import { InputLabelProps, InputProps, TextField } from "@mui/material";
import { CSSProperties, ChangeEvent, FocusEvent, ReactNode } from "react";

interface IInput {
  label?: string;
  type: string;
  placeholder?: string;
  value: string | number | boolean;
  InputProps?: InputProps;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  InputLabelProps?: InputLabelProps;
  size?: "small" | "medium" | "large" | any;
  name: string;
  select?: boolean;
  defaultValue?: string;
  autoFocus?: boolean;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  children?: ReactNode;
  disabled?: boolean;
  style?: CSSProperties;
}

const Select: React.FC<IInput> = ({
  label,
  type,
  placeholder,
  value,
  InputProps,
  onChange,
  InputLabelProps,
  size,
  name,
  defaultValue,
  autoFocus,
  onBlur,
  error,
  helperText,
  fullWidth,
  children,
  disabled,
  style,
}) => {
  return (
    <TextField
      label={label}
      select={true}
      type={type}
      name={name}
      size={size}
      placeholder={placeholder}
      onBlur={onBlur}
      InputProps={InputProps}
      value={value}
      autoFocus={autoFocus}
      onChange={onChange}
      error={error}
      helperText={helperText}
      defaultValue={defaultValue}
      InputLabelProps={InputLabelProps}
      fullWidth={fullWidth}
      disabled={disabled}
      style={style}
    >
      {children}
    </TextField>
  );
};

export default Select;
