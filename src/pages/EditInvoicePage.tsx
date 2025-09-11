import {
  FunctionComponent,
  ReactElement
} from 'react'
import {Helmet} from 'react-helmet'
const EditInvoicePage: FunctionComponent = (): ReactElement => {
  return (
    <>
      <Helmet>
        <title>
          Edit | Invoices
        </title>
      </Helmet>
    </>
  )
}
export default EditInvoicePage