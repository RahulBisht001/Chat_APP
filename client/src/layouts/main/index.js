import { Container, Stack } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import Logo from '../../assets/Images/Hike.png'


const isAuthenticated = true

const MainLayout = () => {

  if (isAuthenticated) {
    return <Navigate to='/app' />
  }


  return (
    <>
      <Container sx={{ mt: 5 }} maxWidth="sm">
        <Stack spacing={3}>
          <Stack sx={{ width: '100%' }} alignItems={'center'} direction={'column'}>
            <img style={{ width: 80, height: 80 }} src={Logo} alt="App Logo" />
          </Stack>
        </Stack>
        <div>Main Layout</div>

        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
