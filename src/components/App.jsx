import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loader from './Loader';

const MainPage = lazy(() => import('../pages/MainPage'));
const DatePage = lazy(() => import('../pages/DatePage'));

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Suspense fallback={<Loader isAbsolute />}>
          <MainPage />
        </Suspense>
      )
    },
    {
      path: '/:date',
      element: (
        <Suspense fallback={<Loader isAbsolute />}>
          <DatePage />
        </Suspense>
      )
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer autoClose={3000} hideProgressBar theme="colored" transition={Zoom} />
    </>
  );
};

export default App;
