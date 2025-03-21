import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export default function FullPageSkeleton() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar */}
      {/* <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">My Product Store</Typography>
        </Toolbar>
      </AppBar> */}

      {/* Product List Section (Skeleton) */}
      <Box sx={{ flexGrow: 1, paddingTop: 3, paddingBottom: 3 }}>
        <Container>
          <Grid container spacing={2}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Stack spacing={1} alignItems="center">
                  {/* Skeleton for image (rectangular) */}
                  <Skeleton variant="rectangular" width="100%" height={150} />
                  {/* Skeleton for product name (text) */}
                  <Skeleton variant="text" width="60%" />
                  {/* Skeleton for product price (text) */}
                  <Skeleton variant="text" width="40%" />
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      {/* <Box sx={{ backgroundColor: '#3f51b5', color: 'white', padding: 2, textAlign: 'center' }}>
        <Typography variant="body2">© 2025 My Product Store - All Rights Reserved</Typography>
      </Box> */}
    </Box>
  );
}
