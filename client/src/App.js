import React, { forwardRef } from 'react';
import './global.css'
//~ ___routes
import Router from "./routes"
//~ ___theme
import ThemeProvider from './theme'
//~ _____components
import ThemeSettings from './components/settings'
import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert' //! there is no component named as MuiAlert . we are just renaming Alert component from MUI
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackBar } from './Redux/Slices/app';



const vertical = 'bottom'
const horizontal = 'center'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function App() {

  const dispatch = useDispatch()

  const obj =
    useSelector((state) => state.app.snackbar)
  console.log("Object")
  console.log(obj)

  const { severity, message, open } =
    useSelector((state) => state.app.snackbar || { open: false, message: "", severity: "" });


  return (
    <>
      <ThemeProvider>
        <ThemeSettings>
          {" "}
          <Router />{" "}
        </ThemeSettings>
      </ThemeProvider>

      {message && open
        ? (<Snackbar
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={4000}
          open={open}
          key={vertical + horizontal}
          onClose={() => { dispatch(closeSnackBar()) }}
        >
          <Alert
            onClose={() => { dispatch(closeSnackBar()) }}
            severity={severity}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>

        </Snackbar >)
        : <></>
      }
    </>
  )
}

export default App;
