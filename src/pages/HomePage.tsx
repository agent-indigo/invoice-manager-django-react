import {
  FunctionComponent,
  ReactElement
} from 'react'
import {Helmet} from 'react-helmet'
const HomePage: FunctionComponent = (): ReactElement => {
  return (
    <>
      <Helmet>
        <title>Home | Invoices</title>
      </Helmet>
    </>
  )
}
export default HomePage