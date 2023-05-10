import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'
import { Stack } from '@mui/material'

import SideBar from './SideBar';



const DashboardLayout = () => {

  const { isLoggedIn } = useSelector((state) => state.auth)

  if (!isLoggedIn) {
    return <Navigate to='/auth/login' />
  }


  return (
    <Stack direction={'row'}>

      {/* SideBar : List of Contacts*/}
      <SideBar />

      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
