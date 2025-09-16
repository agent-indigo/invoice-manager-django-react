import {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useState
} from 'react'
import {
  Button,
  Form
} from 'react-bootstrap'
import {
  FaCheck,
  FaFileInvoiceDollar,
  FaTimes
} from 'react-icons/fa'
import {
  NavigateFunction,
  useNavigate,
  useParams
} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import {toast} from 'react-toastify'
import ContextProps from '@/types/ContextProps'
import Invoice from '@/types/Invoice'
import {useGetContext} from '../components/ContextProvider'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
const EditInvoicePage: FunctionComponent = (): ReactElement => {
  const {id}: Partial<Invoice> = useParams<Record<string, string>>()
  const navigate: NavigateFunction = useNavigate()
  const {
    token,
    invoices,
    setInvoices
  }: ContextProps = useGetContext()
  const [
    invoice,
    setInvoice
  ] = useState<Invoice>({
    id: '',
    vendor: '',
    invoice_id: '',
    date: '',
    subtotal: '',
    hst: '',
    total: '',
    user_id: 0,
    created_at: new Date(),
    updated_at: new Date()
  })
  const [
    vendor,
    setVendor
  ] = useState<string>(invoice.vendor)
  const [
    date,
    setDate
  ] = useState<string>(invoice.date)
  const [
    invoice_id,
    set_invoice_id
  ] = useState<string>(invoice.invoice_id)
  const [
    subtotal,
    setSubtotal
  ] = useState<string>(invoice.subtotal)
  const [
    hst,
    setHst
  ] = useState<string>(invoice.hst)
  const [
    total,
    setTotal
  ] = useState<string>(invoice.total)
  const [
    loading,
    setLoading
  ] = useState<boolean>(false)
  useEffect((): void => {(async (): Promise<void> => {
    setLoading(true)
    const response: Response = await fetch(
      `/api/invoices/${id}`, {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
    if (response.ok) {
      setInvoice(await response.json())
    } else {
      toast.error(await response.text())
      navigate('/invoices')
    }
    setLoading(false)
  })()})
  const handleSubmit: Function = async (): Promise<void> => {
    setLoading(true)
    const patch: FormData = new FormData()
    vendor !== invoice.vendor && patch.append(
      'vendor',
      vendor
    )
    subtotal !== invoice.subtotal && patch.append(
      'subtotal',
      subtotal.toString()
    )
    hst !== invoice.hst && patch.append(
      'hst',
      hst.toString()
    )
    total !== invoice.total && patch.append(
      'total',
      total.toString()
    )
    invoice_id !== invoice.invoice_id && patch.append(
      'invoice_id',
      invoice_id
    )
    date !== invoice.date && patch.append(
      'date',
      date
    )
    const response: Response = await fetch(
      `/api/invoices/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(Object.fromEntries(patch.entries())),
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    if (response.ok) {
      const invoice: Invoice = await response.json()
      setInvoice(invoice)
      setInvoices([
        ...invoices.filter((invoice: Invoice): boolean => id !== invoice.id),
        invoice
      ])
      toast.success('Changes saved.')
    } else {
      toast.error(await response.text())
      navigate(`/invoices`)
    }
    setLoading(false)
  }
  const handleDelete: Function = async (): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this invoice? This action cannot be undone!')) {
      setLoading(true)
      const response: Response = await fetch(
        `/api/invoices/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
      if (response.ok) {
        toast.success('Invoice deleted.')
        navigate('/invoices')
      } else {
        toast.error(await response.text())
      }
      setLoading(false)
    }
  }
  const handleEnterKey: Function = async (event: KeyboardEvent<HTMLInputElement>): Promise<void> => event.key === 'Enter' && await handleSubmit()
  return (
    <>
      <Helmet>
        <title>
          Edit | Invoices
        </title>
      </Helmet>
      {loading ? (
        <Loader/>
      ) : (
        <FormContainer>
          <h1>
            <FaFileInvoiceDollar/> Edit invoice
          </h1>
          <Form action={handleSubmit.bind(null)}>
            <Form.Group
              controlId='vendor'
              className='my-3'
            >
              <Form.Label>
                Vendor
              </Form.Label>
              <Form.Control
                type='text'
                value={vendor}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setVendor(event.target.value)}
                onKeyDown={handleEnterKey.bind(null)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              controlId='date'
              className='my-3'
            >
              <Form.Label>
                Date
              </Form.Label>
              <Form.Control
                type='date'
                value={date}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setDate(event.target.value)}
                onKeyDown={handleEnterKey.bind(null)}
              />
            </Form.Group>
            <Form.Group
              controlId='invoice_id'
              className='my-3'
            >
              <Form.Label>
                Invoice ID
              </Form.Label>
              <Form.Control
                type='text'
                value={invoice_id}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => set_invoice_id(event.target.value)}
                onKeyDown={handleEnterKey.bind(null)}
              />
            </Form.Group>
            <Form.Group
              controlId='subtotal'
              className='my-3'
            >
              <Form.Label>
                Subtotal
              </Form.Label>
              <Form.Control
                type='number'
                value={subtotal}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setSubtotal(event.target.value)}
                onKeyDown={handleEnterKey.bind(null)}
              />
            </Form.Group>
            <Form.Group
              controlId='hst'
              className='my-3'
            >
              <Form.Label>
                HST
              </Form.Label>
              <Form.Control
                type='number'
                step='any'
                value={hst}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setHst(event.target.value)}
                onKeyDown={handleEnterKey.bind(null)}
              />
            </Form.Group>
            <Form.Group
              controlId='total'
              className='my-3'
            >
              <Form.Label>
                Total
              </Form.Label>
              <Form.Control
                type='number'
                step='any'
                value={total}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setTotal(event.target.value)}
                onKeyDown={handleEnterKey.bind(null)}
              />
            </Form.Group>
            <Button
              type='submit'
              variant='success'
              className='p-auto text-white'
              disabled={
                loading ||
                vendor === '' ||
                date === '' ||
                invoice_id === '' ||
                subtotal === '' ||
                hst === '' ||
                total === ''
              }
            >
              <FaCheck/> Save
            </Button>
            <Button
              type='button'
              variant='danger'
              className='p-auto text-white'
              disabled={loading}
              onClick={((): void => navigate('/invoices'))}
            >
              <FaTimes/> Cancel
            </Button>
            <Button
              type='button'
              variant='danger'
              className='p-auto text-white'
              disabled={loading}
              onClick={handleDelete.bind(null)}
            >
              <FaTimes/> Delete
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  )
}
export default EditInvoicePage