import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SigninPage } from "./pages/Signin";
import { LoginPage } from "./pages/Login";
import { AuthProvider } from "./context/AuthContextProvider";
import { ProtectedLayout } from "./pages/ProtectedLayout";
import { AuthLayout } from "./pages/AuthLayout";
import { NotepadPage } from "./pages/NotepadPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SigninPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
          </Route>
        </Routes>
        <Routes>
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<NotepadPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
