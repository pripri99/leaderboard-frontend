"use client";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "@/services/i18n/client";

function Leaderboard() {
  const { t } = useTranslation("leaderboard");
  return (
    <Container maxWidth="md">
      <Grid container spacing={3} wrap="nowrap" pt={3}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {t("leaderboard:title")}
          </Typography>
          <Typography> {t("leaderboard:description")} </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withPageRequiredAuth(Leaderboard);
