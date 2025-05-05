// import { useState } from 'react'
import './App.css'
import "@radix-ui/themes/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from "@/components/main-menu.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"}>
            <Route index element={<MainMenu/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
