import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { handleSignUpUserAction } from 'src/redux/actions/auth.action';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').max(20).min(3),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    phone: Yup.string().phone().required('Phone is required').length(10),
    type: Yup.string().is(['user', 'agent']),
    password: Yup.string().required('Password is required')
  });

  const navigateToDashboard = () => {
    navigate('/dashboard/app', { replace: true })
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      type: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (user) => {
      dispatch(handleSignUpUserAction(user, navigateToDashboard))
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
          <TextField
            fullWidth
            autoComplete="name"
            type="string"
            label="Name"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
            disabled={isSubmitting}
          />

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            disabled={isSubmitting}
          />

          <TextField
            fullWidth
            autoComplete="phone"
            type="phone"
            label="Mobile no"
            {...getFieldProps('phone')}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
            disabled={isSubmitting}
          />

          <FormControl
            variant="outlined"
            fullWidth
          >
            <InputLabel >User Type</InputLabel>
            <Select
              // native
              value={values.type}
              {...getFieldProps('type')}
              onChange={(e) => setFieldValue('type', e.target.value)}
              label="User Type"
              error={Boolean(touched.type && errors.type)}
              helperText={touched.type && errors.type}
              disabled={isSubmitting}
            >
              <MenuItem value='user' >Citizen</MenuItem>
              <MenuItem value='agent'>Aadhar Agent</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            disabled={isSubmitting}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          {/* <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link> */}
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Submit
        </LoadingButton>
      </Form>
    </FormikProvider >
  );
}
