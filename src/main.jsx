import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayout from './layouts/MainLayout.jsx';
import Home from './components/Home.jsx';
import Login from './components/pages/Login.jsx';
import Register from './components/pages/Register.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import ShareGardenTips from './components/ShareGardenTips.jsx';
import BrowseTips from './components/BrowseTips.jsx';
import TipDetails from './components/TipDetails.jsx';
import MyTips from './components/MyTips.jsx';
import UpdateTip from './components/UpdateTip.jsx';
import ExploreGardeners from './components/ExploreGardeners.jsx';
import Error from './components/Error.jsx';
import PrivateRoute from './provider/PrivateRoute.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children:[
      {
        index:true,
        Component:Home
      },
      
    ]
  },
  {
    path:"/auth",
    element:<AuthLayout></AuthLayout>,
    children:[
      {
        path:'/auth/login',
        element:<Login></Login>
      },
      {
        path:'/auth/register',
        element:<Register></Register>
      }

    ]

  },
  {
        path:'/share-tip',
        element:<PrivateRoute><ShareGardenTips></ShareGardenTips></PrivateRoute>
      },
      {
        path:'/tips',
        element:<BrowseTips></BrowseTips>
      },
      {
        path: '/tips/:id',
        element: <PrivateRoute><TipDetails></TipDetails></PrivateRoute>
      },
      {
        path: '/my-tips',
        element: <PrivateRoute><MyTips></MyTips></PrivateRoute>
      },
      {
        path: '/update-tip/:id',
        element: <PrivateRoute><UpdateTip></UpdateTip></PrivateRoute>
      },
      {
        path: '/gardeners',
        element: <ExploreGardeners></ExploreGardeners>
      },
      {
    path: "/*",
    element: <Error></Error>
  }
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    
  </StrictMode>,
)
