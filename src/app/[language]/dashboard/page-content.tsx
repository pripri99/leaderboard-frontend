"use client";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "@/services/i18n/client";

function Dashboard() {
  const { t } = useTranslation("dashboard");
  return (
    <Container maxWidth="md">
      <Grid container spacing={3} wrap="nowrap" pt={3}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {t("dashboard:title")}
          </Typography>
          <Typography> {t("dashboard:description")} </Typography>
          <Typography variant="caption" color="secondary">
            To Do: Add image upload button here
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withPageRequiredAuth(Dashboard);
