import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../features/Home/HomePage";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/About/AboutPage";
import ContactPage from "../../features/Contact/ContactPage";





function App() {
 const[darkMode, setDarkMode]=useState(false);
 const palleteType=darkMode ? 'dark': 'light'
const theme=createTheme({
  palette:{
    mode: palleteType,
    background:{
     default: palleteType === 'light' ? '#eaeaea' : '#121212'
    }
  }
})

function handleThemeChange(){
  setDarkMode(!darkMode);
}

  return (
  
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
        <Container>
              <Routes>
                <Route path='/' Component={HomePage} />
                <Route path='/catalog' Component={Catalog} />
                <Route path='/catalog/:id' Component={ProductDetails} />
                <Route path='/about' Component={AboutPage} />
                <Route path='/contact' Component={ContactPage} />
              </Routes>
              
        </Container>       
      </ThemeProvider>
      
  )
}

export default App
