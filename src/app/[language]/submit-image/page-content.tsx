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
import {
  useForm,
  FormProvider,
  useFormState,
  useWatch,
  useFormContext,
} from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import useLeavePage from "@/services/leave-page/use-leave-page";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

type EditFormData = {
  photo?: FileEntity;
  parentCategory?: string;
  childCategory?: string;
  customChildCategory?: string;
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

/**
 * Child component to render the child category select.
 * This component uses useWatch internally, so only this part will re-render when parentCategory changes.
 */
function ChildCategorySelect() {
  const { t } = useTranslation("submit-image");
  const { control, register } = useFormContext<EditFormData>();
  const selectedParentCategory = useWatch({
    control,
    name: "parentCategory",
  });

  if (!selectedParentCategory) return null;

  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel id="child-category-select">
          {t("childCategory.label")}
        </InputLabel>
        <Select
          labelId="child-category-select"
          {...register("childCategory")}
          defaultValue=""
          data-testid="child-category-select"
        >
          <MenuItem value="">
            <em>{t("childCategory.placeholder")}</em>
          </MenuItem>
          {(
            t(`childCategories.${selectedParentCategory}`, {
              returnObjects: true,
            }) as string[]
          ).map((category: string) => (
            <MenuItem
              key={category}
              value={category}
              title={t(`childCategoryDefinitions.${category}`)}
            >
              {category}
            </MenuItem>
          ))}
          <MenuItem value="OTHER">{t("childCategory.other")}</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
}

/**
 * Child component to render the custom child category field.
 * It uses useWatch to check if "OTHER" is selected.
 */
function CustomChildCategory() {
  const { t } = useTranslation("submit-image");
  const { control, register } = useFormContext<EditFormData>();
  const selectedChildCategory = useWatch({
    control,
    name: "childCategory",
  });

  if (selectedChildCategory !== "OTHER") return null;

  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        label={t("childCategory.specify")}
        {...register("customChildCategory")}
        data-testid="custom-child-category"
      />
    </Grid>
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
      parentCategory: "",
      childCategory: "",
      customChildCategory: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    console.log("image:", formData);
    // Add minio and success messages here
  });

  useEffect(() => {
    reset({
      photo: user?.photo,
      parentCategory: "",
      childCategory: "",
      customChildCategory: "",
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
                <InputLabel id="parent-category-select">
                  {t("submit-image:selectLabel")}
                </InputLabel>
                <Select
                  labelId="parent-category-select"
                  {...methods.register("parentCategory")}
                  defaultValue=""
                  onChange={(e) =>
                    methods.setValue("parentCategory", e.target.value)
                  }
                  data-testid="parent-category-select"
                >
                  <MenuItem value={t("labels.category1")}>
                    {t("labels.category1")}
                  </MenuItem>
                  <MenuItem value={t("labels.category2")}>
                    {t("labels.category2")}
                  </MenuItem>
                  <MenuItem value={t("labels.category3")}>
                    {t("labels.category3")}
                  </MenuItem>
                  <MenuItem value={t("labels.category4")}>
                    {t("labels.category4")}
                  </MenuItem>
                  <MenuItem value={t("labels.category5")}>
                    {t("labels.category5")}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Render child category select and custom field in separate components */}
            <ChildCategorySelect />
            <CustomChildCategory />
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
          <Typography>{t("submit-image:description")}</Typography>
          <FormImageInfo />
        </Grid>
      </Grid>
    </Container>
  );
}

export default withPageRequiredAuth(SubmitImage);
