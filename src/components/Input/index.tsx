import { TextField } from "@mui/material";

interface IInput {
  label?: string;
  type: string;
  placeholder?: string;
  value: any;
  InputProps?: any;
  onChange?: any;
  maxLength?: any;
  InputLabelProps?: Object;
  size?: any;
  name: string;
  select?: boolean;
  defaultValue?: string;
  autoFocus?: boolean;
  onBlur?: any;
  ref?: any;
  error?: any;
  helperText?: any;
  fullWidth?: any;
  children?: any;
  disabled?: any;
  style?: any;
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
