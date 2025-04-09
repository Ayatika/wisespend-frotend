import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Routings from './Routing'
import { ContextPageProvider } from './ContextPage'

function App() {

  return (
    <ContextPageProvider>
    <Routings/>
  </ ContextPageProvider>
  )
}

export default App
