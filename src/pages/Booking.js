import { Navigation } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Slots from '../sections/booking/slots';
import dayjs from 'dayjs';
// import {useSelector, useDispatch} from 'react-redux';

export default function Booking(props) {
    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        console.log(state)
    }, [])

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ padding: '10px', backgroundImage: `url(${state.image})`, width: '100%', height: '250px', borderRadius: '5px', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                <div style={{ color: 'white', fontSize: '20px' }}>{state.name}</div>
            </div>
            <div style={{ marginTop: 50, fontSize: '16px' }}>
                Available Slots: <span style={{marginLeft: 8}}>{dayjs().format('YYYY-MM-DD')}</span>
            </div>
            <Slots agent={state} />
        </div>
    )
}