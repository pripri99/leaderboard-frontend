"use client";
import useAuth from "@/services/auth/use-auth";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Link from "@/components/link";
import { useTranslation } from "@/services/i18n/client";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
}));

function SubmitImage() {
  const { user } = useAuth();
  const { t } = useTranslation("submit-image");
  return (
    <Container maxWidth="md">
       <Grid container spacing={3} wrap="nowrap" pt={3}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
          {t("submit-image:title")}
          </Typography>
          <Typography> {t("submit-image:description")} </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withPageRequiredAuth(SubmitImage);
