import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import Login from './pages/Login';
import MyProfile from './components/dashboard/MyProfile';
import ProtectedRoute from './components/ProtectedRoute';
import Calculate from './components/dashboard/Calculate';
import ExploreLawCourses from './pages/ExploreLawCourses';
import ExploreBusCourses from './pages/ExploreBusCourses';
import ExploreSocialSciCourses from './pages/ExploreSocialSciCourses';
import Testimonials from './pages/Testimonials';
import ExploreGeoSciCourses from './pages/ExploreGeoSciCourses ';
import Recommendations from './components/dashboard/Recommendations';
import Mentorship from './components/dashboard/Mentorship';
import Universities from './components/dashboard/Universities';
import MyBookings from './components/dashboard/MyBookings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: 'testimonials',
    element: <Testimonials />,
    errorElement: <Error />,
  },
  {
    path: 'explore-law-courses/cluster1',
    element: <ExploreLawCourses />,
    errorElement: <Error />,
  }, 
  {
    path: 'explore-bus-courses/cluster2',
    element: <ExploreBusCourses />,
    errorElement: <Error />,
  },
  {
    path: 'explore-soc-courses/cluster3',
    element: <ExploreSocialSciCourses />,
    errorElement: <Error />,
  },
  {
    path: 'explore-geo-courses/cluster4',
    element: <ExploreGeoSciCourses />,
    errorElement: <Error />,
  },
  
  {
    path: 'register',
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: 'login',
    element: <Login />,
    errorElement: <Error />,
  },  
  {
    path: 'dashboard/me',
    element: (
      <ProtectedRoute requiredRoles={['user']}>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <MyProfile />,
      },
      {
        path: "calculate",
        element: <Calculate />,
      },
      {
        path: "universities",
        element: <Universities />,
      },
      {
        path: "mentorship",
        element: <Mentorship />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: "recommendation",
        element: <Recommendations />,
      }
    ]
  },
  
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
