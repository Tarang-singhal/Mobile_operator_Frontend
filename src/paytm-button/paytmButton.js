import React, { useEffect, useState } from "react";
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL

export function PaytmButton({ amount, isSubmitting }) {

    const { user } = useSelector(state => state.auth)

    const [paymentData, setPaymentData] = useState({
        token: "",
        order: "",
        mid: "",
        amount: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        initialize();
    }, [amount]);

    const initialize = async () => {
        let orderId = 'Order_' + new Date().getTime();

        // Sandbox Credentials
        let mid = process.env.REACT_APP_MERCHANT_ID; // Merchant ID
        let mkey = process.env.REACT_APP_MERCHANT_KEY; // Merhcant Key

        // console.log(orderId, amount, userId);
        try {
            const res = await Axios.post(
                BASE_URL + `/paytm/initiatePayment`,
                {
                    orderId,
                    amount,
                    userId: user._id
                },

            )

            setPaymentData({
                token: res.data.body.txnToken,
                order: orderId,
                mid: mid,
                amount: amount
            })
            return;
        } catch (err) {
            console.log(err);
        }
    }

    const makePayment = async () => {

        setLoading(true);
        var config = {
            "root": "",
            "style": {
                "bodyBackgroundColor": "#fafafb",
                "bodyColor": "",
                "themeBackgroundColor": "#0FB8C9",
                "themeColor": "#ffffff",
                "headerBackgroundColor": "#284055",
                "headerColor": "#ffffff",
                "errorColor": "",
                "successColor": "",
                "card": {
                    "padding": "",
                    "backgroundColor": ""
                }
            },
            "data": {
                "orderId": paymentData.order,
                "token": paymentData.token,
                "tokenType": "TXN_TOKEN",
                "amount": paymentData.amount /* update amount */
            },
            "payMode": {
                "labels": {},
                "filter": {
                    "exclude": []
                },
                "order": [
                    "CC",
                    "DC",
                    "NB",
                    "UPI",
                    "PPBL",
                    "PPI",
                    "BALANCE"
                ]
            },
            "website": "WEBSTAGING",
            "flow": "DEFAULT",
            "merchant": {
                "mid": paymentData.mid,
                "redirect": true
            },
            "handler": {
                "transactionStatus": function transactionStatus(paymentStatus) {
                    console.log("paymentStatus => ", paymentStatus);
                    setLoading(false);
                },
                "notifyMerchant": function notifyMerchant(eventName, data) {
                    console.log(eventName, data, "Closed");
                    setLoading(false);
                }
            }
        };

        console.log(window.Paytm, window.Paytm.CheckoutJS)

        if (window.Paytm && window.Paytm.CheckoutJS) {
            // initialze configuration using init method
            window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                console.log('Before JS Checkout invoke');
                // after successfully update configuration invoke checkoutjs
                window.Paytm.CheckoutJS.invoke();
            }).catch(function onError(error) {
                console.log("Error => ", error);
            });
        }
    }

    return (
        <div>
            {
                loading ? (
                    <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
                ) : (
                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        style={{ marginTop: '20px' }}
                        loading={isSubmitting}
                        onClick={() => makePayment()}
                    >
                        ADD
                    </LoadingButton>
                )
            }
        </div>
    )
}