import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { BrowserRouter, Routes, Route, } from "react-router" 

import './index.css'

import Dashboard from "./Dashboard"
import { ThemeProvider } from "@/components/theme-provider";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
	<Routes>
	  <Route path="dashboard" element={<Dashboard />} />
	</Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
