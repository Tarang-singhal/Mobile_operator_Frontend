import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../components/Iconify';
import { handleSlotBooking } from 'src/redux/actions/auth.action';
import dayjs from 'dayjs';
// ----------------------------------------------------------------------

export default function Slots({ agent }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth)

  // const RegisterSchema = Yup.object().shape({
  //   slot: Yup.array()
  // });

  const navigateToDashboard = () => {
    navigate('/dashboard/app', { replace: true })
  }

  const formik = useFormik({
    initialValues: {
      slotNumber: '',
    },
    // validationSchema: RegisterSchema,
    onSubmit: ({ slotNumber }) => {
      const details = {
        agentId: agent._id,
        userId: user._id,
        slotNumber
      }

      console.log(details)
      dispatch(handleSlotBooking(details, navigate('/bookings', { replace: true })))
    }
  });

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={2}>

          <FormControl
            style={{ marginTop: 15 }}
            variant="outlined"
            fullWidth
          >
            <InputLabel >Choose Timing</InputLabel>
            <Select
              // native
              value={values.slotNumber}
              // {...getFieldProps('type')}
              onChange={(e) => setFieldValue('slotNumber', e.target.value)}
              label="Choose Timing"
              error={Boolean(touched.slotNumber && errors.slotNumber)}
              helperText={touched.slotNumber && errors.slotNumber}
              disabled={isSubmitting}
            >
              {
                agent.slots.map((slot, idx) => {
                  console.log(slot.isBooked, dayjs(slot.bookedDate).date(), dayjs().date())
                  if (!slot.isBooked || dayjs(slot.bookedDate).date() < dayjs().date()) {
                    return <MenuItem value={idx} key={slot._id}>{slot.start} - {slot.end}</MenuItem>
                  }
                  return null
                })
              }
            </Select>
          </FormControl>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          style={{ marginTop: '20px' }}
          loading={isSubmitting}
        >
          Book
        </LoadingButton>
      </Form>
    </FormikProvider >
  );
}
