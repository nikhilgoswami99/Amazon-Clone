import "./App.css";
import Layout from "./container/layout";
import Home from "./pages/home/home";
import Cart from "./pages/cart/cart";
import Login from "./pages/registration/login";
import SignUp from "./pages/registration/signUp";
import ProtectedRoute from "./components/protected routes/protectedRoute";

import MyState from "./context/data/myState";

import { ToastContainer } from "react-toastify";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart></Cart>
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/sign-up",
      element: <SignUp></SignUp>,
    },
  ]);

  return (
    <MyState>
      <ToastContainer
        position="top-center" // Position of the toast
        autoClose={3000} // Auto close after 5 seconds
        hideProgressBar={false} // Show the progress bar
        newestOnTop={false} // Toasts appear in order
        closeOnClick // Close on click
        rtl={false} // Right-to-left layout
        pauseOnFocusLoss // Pause toast on window blur
        draggable // Draggable toast
        pauseOnHover // Pause toast on hover
        theme="light" // Light or dark theme
      />
      <RouterProvider router={router}></RouterProvider>
    </MyState>
  );
}

export default App;
