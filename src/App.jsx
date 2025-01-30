import { createBrowserRouter , RouterProvider } from "react-router-dom";
import "./App.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/@fortawesome/fontawesome-free/js/brands.min.js";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Register from "./Pages/Register/Register";
import Register2 from "./Pages/Register/Register2";
import Login from "./Pages/Login/Login";
// import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import UserTokenContextProvider from "./Context/userTokenContext.jsx";
import HousingWork from "./Pages/Housing&Work/Housing-Work";
import Age from "./Pages/Age/Age";
import PhoneNumber from "./Pages/PhoneNumber/PhoneNumber";
import SuccessPage from "./Pages/SuccessPage/SuccessPage";


function App() {
  let routing = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/home", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/register2", element: <Register2 /> },
        { path: "/housing-work", element: <HousingWork /> },
        { path: "/age", element: <Age /> },
        { path: "/phoneNumber", element: <PhoneNumber /> },
        { path: "/successPage", element: <SuccessPage /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <UserTokenContextProvider>
        <RouterProvider router={routing}></RouterProvider>
      </UserTokenContextProvider>
    </>
  );
}

export default App;
