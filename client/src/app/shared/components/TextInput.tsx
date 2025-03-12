import { TextField, TextFieldProps } from "@mui/material";
import { useEffect } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  locationValue?: string | number;
} & UseControllerProps<T> &
  TextFieldProps;

export default function TextInput<T extends FieldValues>({
  locationValue,
  ...props
}: Props<T>) {
  const { field, fieldState } = useController({ ...props });
  
  // Update field value when locationValue changes
  useEffect(() => {
    if (locationValue !== undefined && locationValue !== null) {
      field.onChange(locationValue);
    }
  }, [locationValue, field]);

  return (
    <TextField
      {...props}
      {...field}
      value={locationValue || field.value || ""}
      fullWidth
      variant="outlined"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
}
