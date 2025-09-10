import {
  FunctionComponent,
  ReactElement
} from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {ToastContainer} from 'react-toastify'
import ContextProvider from './components/ContextProvider'
import Footer from './components/Footer'
import SetRootPasswordRoute from './security/SetRootPasswordRoute'
import ProductionRoute from './security/ProductionRoute'
import LoginRoute from './security/LoginRoute'
import PrivateRoute from './security/PrivateRoute'
import StaffRoute from './security/StaffRoute'
import SuperuserRoute from './security/SuperuserRoute'
import 'bootswatch/dist/united/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
const App: FunctionComponent = (): ReactElement => (
  <ContextProvider>
    <BrowserRouter>
      <main className="py-3">
        <Container>
          <Routes>
            <Route 
              path='setup/'
              element={<Outlet/>}
            >
              <Route
                path='setRootPassword'
                element={<SetRootPasswordRoute/>}
              ></Route>
            </Route>
            <Route
              path='/'
              element={<ProductionRoute/>}
            >
              <Route
                path=''
                element={<LoginRoute/>}
              ></Route>
              <Route
                path=''
                element={<PrivateRoute/>}
              >
                <Route
                  path='staff'
                  element={<StaffRoute/>}
                ></Route>
                <Route
                  path='superuser'
                  element={<SuperuserRoute/>}
                ></Route>
              </Route>
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer/>
      <ToastContainer/>
    </BrowserRouter>
  </ContextProvider>
)
export default App