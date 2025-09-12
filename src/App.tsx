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
import Header from './components/Header'
import Footer from './components/Footer'
import CreateSuperuserRoute from './security/CreateSuperuserRoute'
import ProductionRoute from './security/ProductionRoute'
import LoginRoute from './security/LoginRoute'
import PrivateRoute from './security/PrivateRoute'
import StaffRoute from './security/StaffRoute'
import SuperuserRoute from './security/SuperuserRoute'
import CreateSuperuserPage from './pages/CreateSuperuserPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CurrentUserPage from './pages/CurrentUserPage'
import InvoicesListPage from './pages/InvoicesListPage'
import AddInvoicePage from './pages/AddInvoicePage'
import EditInvoicePage from './pages/EditInvoicePage'
import 'bootswatch/dist/united/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
const App: FunctionComponent = (): ReactElement => (
  <ContextProvider>
    <BrowserRouter>
      <Header/>
      <main className="py-3">
        <Container>
          <Routes>
            <Route
              path='/'
              element={<ProductionRoute/>}
            >
              <Route
                index={true}
                path=''
                element={<HomePage/>}
              />
              <Route
                path=''
                element={<LoginRoute/>}
              >
                <Route
                  path='login'
                  element={<LoginPage/>}
                />
                <Route
                  path='register'
                  element={<RegisterPage/>}
                />
              </Route>
              <Route
                path=''
                element={<PrivateRoute/>}
              >
                <Route
                  path='user'
                  element={<CurrentUserPage/>}
                />
                <Route
                  path='invoices/'
                  element={<Outlet/>}
                >
                  <Route
                    path=''
                    element={<InvoicesListPage/>}
                  />
                  <Route
                    path='add'
                    element={<AddInvoicePage/>}
                  />
                  <Route
                    path=':id'
                    element={<EditInvoicePage/>}
                  />
                </Route>
                <Route
                  path='staff/'
                  element={<StaffRoute/>}
                >
                  <Route
                    path='superuser/'
                    element={<SuperuserRoute/>}
                  ></Route>
                </Route>
              <Route 
                path='setup/'
                element={<Outlet/>}
              >
                <Route
                  path='createSuperuser/'
                  element={<CreateSuperuserRoute/>}
                >
                  <Route
                    path=''
                    element={<CreateSuperuserPage/>}
                  />
                </Route>
              </Route>
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