import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Welcome from "./auth/Welcome";


const router = createBrowserRouter([
    { path: '', element: <App /> },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/welcome', element: <Welcome /> }

])


export default router;