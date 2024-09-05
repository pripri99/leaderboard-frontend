import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "home");

  return {
    title: t("title"),
  };
}

export default async function Home({ params }: Props) {
  const { t } = await getServerTranslation(params.language, "home");

  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={3}
        wrap="nowrap"
        pt={3}
        direction="column"
        sx={{ height: "90vh", justifyContent: "space-between" }}
      >
        <Grid item>
          <Typography variant="h3" data-testid="home-title" gutterBottom>
            {t("title")}
          </Typography>
          <Typography>
            {t("description")}
          </Typography>
        </Grid>
        {/* <Grid item sx={{ mx: "auto" }}>
          <MuiLink href="/privacy-policy">Privacy Policy</MuiLink>
        </Grid> */}
      </Grid>
    </Container>
  );
}
