import { Dashboard } from "./pages/dashboard";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return <BrowserRouter>
      <Routes>
        <Route path="Signup" element={<Signup />} />
        <Route path="Signin" element={<Signin />} />
        <Route path="Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
        
}

export default App