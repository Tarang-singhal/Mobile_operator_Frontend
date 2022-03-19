import { Navigation } from '@mui/icons-material';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import {useSelector, useDispatch} from 'react-redux';

export default function Booking(props) {
    const navigate = useNavigate();
    const { state } = useLocation();

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ padding: '10px', backgroundImage: `url(${state.image})`, width: '100%', height: '250px', borderRadius: '5px', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                <div style={{ color: 'white' }}>{state.name}</div>
            </div>
            <div>
                Available Slots
            </div>
        </div>
    )
}