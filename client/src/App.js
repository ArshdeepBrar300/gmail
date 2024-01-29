
import {  Navigate, RouterProvider, Route,createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import { routes } from './routes/routes';
import { Suspense, lazy } from 'react';
import SuspenseLoader from './components/SuspenseLoader';
const ErrorComponent=lazy(()=> import('./components/ErrorComponent'));


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={routes.main.path} element={<Navigate to={`${routes.emails.path}/inbox`}/>}/>
      <Route path={routes.main.path} element={<routes.main.element/>}>
        <Route path={`${routes.emails.path}/:type`} element={<routes.emails.element/>} errorElement={<ErrorComponent/>}/>
        <Route path={routes.view.path} element={<routes.view.element/>} errorElement={<ErrorComponent/>}/>
       </Route>
       <Route path={routes.invalid.path} element={<Navigate to={`${routes.emails.path}/inbox`}/>}/>
    </Route>
  )

)
function App() {
  return (
    <Suspense fallback={<SuspenseLoader/>}>
         <RouterProvider router={router}/>
    </Suspense>
 
  );
}

export default App;