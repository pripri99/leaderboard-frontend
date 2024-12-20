"use client";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormFileInput from "@/components/form/file-input/form-file-input";
import { useTranslation } from "@/services/i18n/client";
import { FileEntity } from "@/services/api/types/file-entity";
import useAuth from "@/services/auth/use-auth";
import * as yup from "yup";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import useLeavePage from "@/services/leave-page/use-leave-page";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type EditFormData = {
  photo?: FileEntity;
  label?: string;
};

const useValidationSchema = () => {
  return yup.object().shape({});
};

function FormActions() {
  const { t } = useTranslation("submit-image");
  const { isSubmitting, isDirty } = useFormState();
  useLeavePage(isDirty);

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={isSubmitting}
      data-testid="save-profile"
    >
      {t("submit-image:actions.submit")}
    </Button>
  );
}

function FormImageInfo() {
  const { user } = useAuth();
  const { t } = useTranslation("submit-image");
  const validationSchema = useValidationSchema();

  const methods = useForm<EditFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      photo: undefined,
      label: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    console.log("image:", formData);
    // to add minio and success messages
  });

  useEffect(() => {
    reset({
      photo: user?.photo,
      label: "",
    });
  }, [user, reset]);

  return (
    <FormProvider {...methods}>
      <Container maxWidth="xs">
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} mb={3} mt={3}>
            <Grid item xs={12}>
              <FormFileInput<EditFormData> name="photo" testId="photo" />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="label-select">
                  {t("submit-image:selectLabel")}
                </InputLabel>
                <Select
                  labelId="label-select"
                  {...methods.register("label")}
                  defaultValue=""
                  data-testid="label-select"
                >
                  <MenuItem value="label1">{t("labels.label1")}</MenuItem>
                  <MenuItem value="label2">{t("labels.label2")}</MenuItem>
                  <MenuItem value="label3">{t("labels.label3")}</MenuItem>
                  <MenuItem value="label4">{t("labels.label4")}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormActions />
            </Grid>
          </Grid>
        </form>
      </Container>
    </FormProvider>
  );
}

function SubmitImage() {
  const { t } = useTranslation("submit-image");

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} wrap="nowrap" pt={3}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {t("submit-image:title")}
          </Typography>
          <Typography> {t("submit-image:description")} </Typography>
          <FormImageInfo />
        </Grid>
      </Grid>
    </Container>
  );
}

export default withPageRequiredAuth(SubmitImage);
