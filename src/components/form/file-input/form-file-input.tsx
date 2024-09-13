import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Controller,
  ControllerProps,
  FieldPath,

  FieldValues,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import IconButton from "@mui/material/IconButton";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

type FileInputProps = {
  error?: string;
  onChange: (value: File | null) => void;
  onBlur: () => void;
  value?: File;
  disabled?: boolean;
  testId?: string;
};

const FileInputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  position: "relative",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  border: "1px dashed",
  borderColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",

  "&:hover": {
    borderColor: theme.palette.text.primary,
  },
}));

const StyledWrapperFile = styled(Box)(() => ({
  position: "relative",
  width: 100,
  height: 100,
}));

const StyledOverlay = styled(Box)(() => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.7)",
    transition: ".5s ease",
    opacity: 0,
    "&:hover": {
      opacity: 1,
    },
  };
});

const StyledFile = styled(Avatar)(({ }) => ({
  width: 100,
  height: 100,
}));

function FileInput(props: FileInputProps) {
  const { onChange } = props;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsLoading(true);
      onChange(acceptedFiles[0]);
      setIsLoading(false);
    },
    [onChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 2, // 2MB
    disabled: isLoading || props.disabled,
  });

  const removeFileHandle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onChange(null);
  };

  return (
    <FileInputContainer {...getRootProps()}>
      {props?.value ? (
        <StyledWrapperFile>
          <StyledFile src={URL.createObjectURL(props.value)} />
          <StyledOverlay>
            <IconButton
              disableRipple
              onClick={removeFileHandle}
              color="inherit"
            >
              <ClearOutlinedIcon
                sx={{ width: 50, height: 50, color: "white" }}
              />
            </IconButton>
          </StyledOverlay>
        </StyledWrapperFile>
      ) : <></>}

      <Box sx={{ mt: 2 }}>
        {props?.value ? (
          <Button
            variant="contained"
            component="label"
            disabled={isLoading}
            data-testid={props.testId}
          >
            {isLoading
              ? t("common:loading")
              : t("common:formInputs.fileInput.replaceFile")}
            <input {...getInputProps()} />
          </Button>) :
          (<Button
            variant="contained"
            component="label"
            disabled={isLoading}
            data-testid={props.testId}
          >
            {isLoading
              ? t("common:loading")
              : t("common:formInputs.fileInput.selectFile")}
            <input {...getInputProps()} />
          </Button>)
        }

      </Box>

      {props.error && (
        <Box sx={{ mt: 1 }}>
          <Typography sx={{ color: "red" }}>{props.error}</Typography>
        </Box>
      )}
    </FileInputContainer>
  );
}

function FormFileInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue"> & {
    disabled?: boolean;
    testId?: string;
  }
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => (
        <FileInput
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          error={fieldState.error?.message}
          disabled={props.disabled}
          testId={props.testId}
        />
      )}
    />
  );
}

export default FormFileInput;
