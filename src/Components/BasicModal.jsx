
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import useMutationCart from './Hooks/useMutationCart';
import checkout, { payCash } from '../APIS/payment';
import { toast } from 'react-toastify';
import { border } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  border: '4px solid green',
  bgcolor: 'background.paper',
  boxShadow: 30,
  p: 7,
};

export default function BasicModal({ cardId }) {
  let [flag, setFlag] = React.useState(false)
  let { mutate: onlinePay, data: onlineData } = useMutationCart(checkout)
  let { mutate: cashMutate, data: dataCash } = useMutationCart(payCash)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  function handleSubmit(values) {
    if (flag)
      onlinePay({ cardId, values });
    else
      cashMutate({ cardId, values });
  }

  if (dataCash?.data?.status === 'success') {
    toast.success('ALL IS DONE');
  }

  if (onlineData?.data?.status == 'success')
    window.location.href = onlineData?.data?.session?.url;

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },
    onSubmit: handleSubmit
  })

  return (
    <div>
        <Button onClick={() => { handleOpen(); setFlag(!flag) }} variant='contained' color='success' >Pay using debit card </Button><br/>
        <Button onClick={handleOpen} variant='contained' color='success' sx={{ mt: 2 }}>Cash on delivery</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
            <h1 className='mt-4 text-green-700 text-xs border-b-2 border-green-500 border-opacity-50'>ALL DETAILS</h1>
            <div className="">
              <label htmlFor="details" className="block text-sm font-medium text-gray-900 dark:text-white">Details</label>
              <input onChange={formik.handleChange} value={formik.values.details} type="text" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Details..." required />
            </div>
            <h1 className='mt-4 text-green-700 text-xs border-b-2 border-green-500 border-opacity-50'>ENTER YOUR PHONE NUMBER</h1>
            <div className="">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
              <input onChange={formik.handleChange} value={formik.values.phone} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 " placeholder='Your Phone' />
            </div>
            <h1 className='mt-4 text-green-700 text-xs border-b-2 border-green-500 border-opacity-50'>ENTER YOUR PHONE CITY NAME</h1>
            <div className="m-0">
              <label htmlFor="city" className="block text-sm font-medium text-gray-900 dark:text-white">Your City</label>
              <input onChange={formik.handleChange} value={formik.values.city} type="tel" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 mt-0" placeholder='Your City' />
            </div>
            <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4">Submit</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
