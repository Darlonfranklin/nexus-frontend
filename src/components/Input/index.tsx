import { InputLabelProps, InputProps, TextField } from "@mui/material";

interface IInput {
  label?: string;
  type: string;
  placeholder?: string;
  value: string | number | boolean;
  InputProps?: InputProps;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: any;
  InputLabelProps?: InputLabelProps;
  size?: "small" | "medium" | "large" | any;
  name: string;
  select?: boolean;
  defaultValue?: string;
  autoFocus?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  ref?: React.Ref<any>;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Input: React.FC<IInput> = ({
  label,
  type,
  placeholder,
  value,
  InputProps,
  onChange,
  InputLabelProps,
  size,
  name,
  select,
  defaultValue,
  autoFocus,
  onBlur,
  ref,
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
      select={select}
      type={type}
      name={name}
      size={size}
      placeholder={placeholder}
      onBlur={onBlur}
      ref={ref}
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

export default Input;
