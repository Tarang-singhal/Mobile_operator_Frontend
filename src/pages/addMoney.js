import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// material
import { Stack, TextField, Button, InputAdornment, FormControl, Select, InputLabel, MenuItem, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
// import Iconify from '../../components/Iconify';
import { handleSlotBooking } from 'src/redux/actions/auth.action';
import Page from '../components/Page';
import { CheckoutProvider, Checkout, injectCheckout } from 'paytm-blink-checkout-react'



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
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)

    const [isCheckout, setCheckout] = useState(false)

    const RegisterSchema = Yup.object().shape({
        amount: Yup.number().min(10).max(500)
    });

    const navigateToDashboard = () => {
        navigate('/dashboard/app', { replace: true })
    }

    const formik = useFormik({
        initialValues: {
            amount: 0,
        },
        validationSchema: RegisterSchema,
        onSubmit: ({ amount }) => {
            setCheckout(true)
            console.log(amount)
        }
    });

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const buttonAmounts = [50, 100, 150]

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values, setFieldValue } = formik;

    return (
        <RootStyle title="Add Money | Wallet">
            <Container>
                <ContentStyle>
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

                            <LoadingButton
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                style={{ marginTop: '20px' }}
                                loading={isSubmitting}
                            >
                                ADD
                            </LoadingButton>
                        </Form>
                    </FormikProvider >
                </ContentStyle>
            </Container>
            {
                isCheckout && <CheckoutProvider
                    config={defaultMerchantConfiguration}
                    openInPopup="false"
                    env='STAGE'
                >
                    <Checkout />
                </CheckoutProvider>
            }
        </RootStyle>
    );
}

let defaultMerchantConfiguration = {
    "root": "",
    "style": { "bodyBackgroundColor": "", "bodyColor": "", "themeBackgroundColor": "", "themeColor": "", "headerBackgroundColor": "", "headerColor": "", "errorColor": "", "successColor": "" },
    "flow": "DEFAULT",
    "data": {
        "orderId": "", "token": "", "tokenType": "GUEST", "amount": "",
        "userDetail": { "mobileNumber": "", "name": "" }
    },
    "merchant": { "mid": "", "name": "", "logo": "", "redirect": true, "hidePaytmBranding": false },
    "mapClientMessage": {
        "static": {
            "label": { "paymodeSelection": "Select an option to pay", "paymodeOtherSelection": "Select from other options", "saveCardSelection": "SELECT A SAVED CARD" }, "error": {}
        },
        "header": {
            "label": { "otpSend": "OTP requested successfully", "orderID": "Order ID", "account": "Account", "switch": "Switch", "selectOption": "Select an option to pay" }, "error": {}
        },
        "footer": {
            "label": { "message": "100% Secure Payments Powered by Paytm" }, "error": {}
        },
        "offers": {
            "label": { "message": "Exclusive Offers for You" }, "error": {}
        },
        "processing": { "label": { "heading": "Processing Your Payment", "info": "Please do not close this window or press back while we confirm your payment status" }, "error": {} },
        "retry": { "label": { "paymentFailed": "Payment Failed", "info": "Please do not close this window or press back while we confirm your payment status" }, "error": {} },
        "card": { "label": { "cardNumber": "Card Number", "expiry": "Expiry / Validity", "cvv": "CVV", "savedCard": "Save this card for future payments" }, "error": { "cardNumber": "Please enter valid card number", "expiry": "invalid Expiry Date", "cvv": "Please enter valid cvv." } },
        "ppbl": { "label": { "changeNumber": "Change Balance", "availableBalance": "Available Balance" }, "error": { "passcode": "Please enter valid passcode" } }, "pdc": {
            "label": { "changeNumber": "Change Balance", "availableBalance": "Available Balance" },
            "error": { "passcode": "Please enter valid passcode" }
        }, "upi": { "label": {}, "error": { "required": "Please enter a UPI ID", "valid": "Please enter a valid UPI ID" } }, "cod": { "label": {} }, "login": { "label": { "labelMessage": "Pay using your saved payment instruments" }, "error": {} }
    }, "labels": {}, "payMode": { "labels": {}, "filter": [], "order": [] }, "handler": {}
};
