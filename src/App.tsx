import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Dashboard } from "./pages/Dashboard"
import { Landing } from "./pages/Landing"
import { SharedBrain } from "./pages/SharedBrain"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/brain/:shareLink" element={<SharedBrain />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App