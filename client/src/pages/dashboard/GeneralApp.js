import React from "react"


import { Box, Stack, useTheme } from "@mui/material"

import Chats from "./Chats"

import Conversation from "../../components/Conversation"
import Contact from "../../components/Contact"
import SharedMessages from "../../components/SharedMessages"
import StarredMessages from '../../components/StarredMessages'


import { useSelector } from "react-redux";


const GeneralApp = () => {

  const theme = useTheme()
  //! State / Store no matter
  const { sidebar } = useSelector((store) => store.app)

  // console.log(sidebar) 

  return (
    <Stack direction={'row'} sx={{ width: '100%' }}>

      {/* Chats */}
      <Chats />

      <Box
        sx={{
          height: '100%',
          width: sidebar.open ? 'calc(100vw - 680px)' : 'calc(100vw - 390px)',
          backgroundColor: theme.palette.mode === 'light' ? '#F0F4FA' : theme.palette.background.default
        }}>
        {/* Conversation */}
        <Conversation />
      </Box>

      {/* Contact Information */}
      {sidebar.open && (() => {

        switch (sidebar.type) {
          case "SHARED":
            return <SharedMessages />
          case "STARRED":
            return <StarredMessages />
          default:
            return < Contact />
        }
      })()}
    </Stack>
  );
};

export default GeneralApp;
