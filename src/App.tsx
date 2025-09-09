import {
  FunctionComponent,
  ReactElement
} from 'react'
import {
  BrowserRouter,
  Routes
} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {ToastContainer} from 'react-toastify'
import Footer from './components/Footer'
import 'bootswatch/dist/united/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
const App: FunctionComponent = (): ReactElement => (
  <BrowserRouter>
    <main className="py-3">
      <Container>
        <Routes>
          
        </Routes>
      </Container>
    </main>
    <Footer/>
    <ToastContainer/>
  </BrowserRouter>
)
export default App