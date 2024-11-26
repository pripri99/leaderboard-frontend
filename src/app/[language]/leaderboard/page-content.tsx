"use client";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useTranslation } from "@/services/i18n/client";
import { useEffect, useState } from "react";
import useAuth from "@/services/auth/use-auth";
import { useLeaderboardService } from "@/services/api/services/leaderboard";
import { User } from "@/services/api/types/user";

function Leaderboard() {
  const { t } = useTranslation("leaderboard");
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const fetchLeaderboard = useLeaderboardService();
  const { user } = useAuth(); // Get currently logged-in user

  useEffect(() => {
    const loadLeaderboard = async () => {
      setIsLoaded(false);
      try {
        const data = await fetchLeaderboard();
        setUsers(data);
      } catch (error) {
        console.error(error);
        setUsers(null);
      } finally {
        setIsLoaded(true);
      }
    };

    loadLeaderboard();
  }, [fetchLeaderboard]);

  if (!isLoaded) {
    return <Typography variant="h6">{t("leaderboard:loading")}</Typography>;
  }

  if (!users) {
    return (
      <Typography variant="h6" color="error">
        {t("leaderboard:errorLoading")}
      </Typography>
    );
  }

  const topUsers = users.slice(0, 5); // Top 5 users
  const currentUserRank = users.findIndex((u) => u.id === user?.id) + 1; // Find current user's rank
  console.log("currentUserRank: ", currentUserRank);

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} wrap="nowrap" pt={3}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            {t("leaderboard:title")}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {t("leaderboard:description")}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={3}>
        {/* Top Users Section */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {t("leaderboard:topUsers")}
          </Typography>
          <Stack direction="row" spacing={2}>
            {topUsers.map((user, index) => (
              <Card key={user.id} sx={{ minWidth: 150 }}>
                <CardContent>
                  <Avatar
                    alt={`${user.firstName} ${user.lastName}`}
                    src={user.photo?.path}
                  />
                  <Typography variant="h6">
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="subtitle2">
                    {t("leaderboard:pointsDescription", {
                      points: user.totalPoints,
                    })}
                  </Typography>
                  <Typography variant="body2">#{index + 1}</Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>

        {/* Full Leaderboard Table */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {t("leaderboard:fullRanking")}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t("leaderboard:rank")}</TableCell>
                  <TableCell>{t("leaderboard:name")}</TableCell>
                  <TableCell>{t("leaderboard:points")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u, index) => (
                  <TableRow
                    key={u.id}
                    selected={u.id === user?.id} // Highlight current user
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {u.firstName} {u.lastName}
                    </TableCell>
                    <TableCell>{u.totalPoints}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Current User Section */}
        {user && currentUserRank > 0 ? (
          <Grid item xs={12} mt={3}>
            <Box textAlign="center">
            <Typography variant="h6">
              {`${t("leaderboard:currentUserRank")} ${currentUserRank}`}
            </Typography>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12} mt={3}>
            <Box textAlign="center">
              <Typography variant="h6" color="textSecondary">
                {t("leaderboard:errorLoading")}
              </Typography>
            </Box>
          </Grid>
        )}

      </Grid>
    </Container>
  );
}

export default withPageRequiredAuth(Leaderboard);
