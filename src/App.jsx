import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  AdminDash,
  SellerDash,
  Rentals,
  PropertyDetails,
  Checkout,
  Wishlist,
  UserProfile,
  Support,
  About,
  Contact,
  PageNotFound
} from "./components";
function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <PageNotFound />
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/Register',
      element: <Register />,
    },
    {
      path: '/AdminDash',
      element: <AdminDash />,
    },
    {
      path: '/SellerDash',
      element: <SellerDash />,
    },
    {
      path: '/Rentals',
      element: <Rentals />,
    },
    {
      path: '/PropertyDetails',
      element: <PropertyDetails />,
    },
    {
      path: '/Checkout',
      element: <Checkout />,
    },
    {
      path: '/Wishlist',
      element: <Wishlist />,
    },
    {
      path: '/UserProfile',
      element: <UserProfile />,
    },
    {
      path: '/Support',
      element: <Support />,
    },
    {
      path: '/About',
      element: <About />,
    },
    {
      path: '/Contact',
      element: <Contact />,
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
