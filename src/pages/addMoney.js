import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// material
import { Stack, TextField, Button, Container } from '@mui/material';
import { PaytmButton } from '../paytm-button/paytmButton'
// component
import Page from '../components/Page';



// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex'
    }
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '80vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
}));

export default function AddMoney() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)


    const RegisterSchema = Yup.object().shape({
        amount: Yup.number().min(10).max(500)
    });

    const formik = useFormik({
        initialValues: {
            amount: 0,
        },
        validationSchema: RegisterSchema,
        onSubmit: ({ amount }) => {
            // setCheckout(true)
            console.log(amount)
        }
    });

    const buttonAmounts = [50, 100, 150]

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values, setFieldValue } = formik;

    return (
        <RootStyle title="Add Money | Wallet">
            <Container>
                <ContentStyle>
                    <h2 style={{ marginBottom: 20 }}>Enter Amount</h2>
                    <FormikProvider value={formik}>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <Stack spacing={2}>

                                <TextField
                                    fullWidth
                                    autoComplete="amount"
                                    type="number"
                                    label="Amount"
                                    {...getFieldProps('amount')}
                                    error={Boolean(touched.amount && errors.amount)}
                                    helperText={touched.amount && errors.amount}
                                    disabled={isSubmitting}
                                />
                            </Stack>

                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', marginTop: '30px' }}>
                                {
                                    buttonAmounts.map(amount => {
                                        return (
                                            <Button
                                                key={amount}
                                                style={{ border: '2px solid #C8FACD', padding: '7px 14px', borderRadius: '5px', color: '#5BE584', fontWeight: '600' }}
                                                onClick={() => setFieldValue('amount', amount)}
                                                disabled={isSubmitting}
                                            >
                                                {amount}
                                            </Button>
                                        )
                                    })
                                }
                            </div>

                            <PaytmButton
                                amount={values.amount}
                                isSubmitting={isSubmitting}
                            />

                            {/* <LoadingButton
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                style={{ marginTop: '20px' }}
                                loading={isSubmitting}
                            >
                                ADD
                            </LoadingButton> */}
                        </Form>
                    </FormikProvider >
                </ContentStyle>
            </Container>
        </RootStyle>
    );
}
