import { TextField, TextFieldProps } from "@mui/material";
import { useEffect } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  autoValue?: string | number;
} & UseControllerProps<T> &
  TextFieldProps;

export default function TextInput<T extends FieldValues>({
  autoValue,
  ...props
}: Props<T>) {
  const { field, fieldState } = useController({ ...props });
  
  // Update field value when locationValue changes
  useEffect(() => {
    if (autoValue !== undefined && autoValue !== null) {
      field.onChange(autoValue);
    }
  }, [autoValue, field]);

  return (
    <TextField
      {...props}
      {...field}
      value={autoValue || field.value || ""}
      fullWidth
      variant="outlined"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
}
