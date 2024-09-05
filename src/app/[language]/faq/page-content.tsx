"use client";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "@/services/i18n/client";

function FAQ() {
  const { t } = useTranslation("faq");
  return (
    <Container maxWidth="md">
      <Grid container spacing={3} wrap="nowrap" pt={3}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {t("faq:title")}
          </Typography>
          <Typography> {t("faq:description")} </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withPageRequiredAuth(FAQ);
