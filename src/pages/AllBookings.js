import react, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import dayjs from 'dayjs';

const BASE_URL = process.env.REACT_APP_API_URL

export default function AllBookings() {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)

    const [slots, setSlots] = useState([])


    useEffect(async () => {
        const { data: { data } } = await Axios.get(BASE_URL + `/slot/slots/${user._id}`)
        console.log(data)
        setSlots(data.slots)
    }, [])

    return (
        <div style={{ width: '100%', marginTop: 30, padding: 10 }}>
            <div style={{ margin: 10 }}>
                All Meetings
            </div>
            {
                slots.map(slot => {
                    let person = {}
                    if (slot.agent_id.type == 'agent') {
                        person = slot.agent_id
                    } else {
                        person = slot.bookedBy
                    }
                    return (
                        <div key={slot._id} style={{ border: '1px solid #ccc', margin: 10, padding: 10, borderRadius: 5 }}>
                            <div style={{ textTransform: 'capitalize' }}>{person.type} - {person.name}</div>
                            <a
                                href={`tel:+91${person.phone}`}>
                                +91- {person.phone}
                            </a>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', fontSize: '12px' }}>
                                <span>Date - {dayjs(slot.bookedDate).format('YYYY-MM-DD')}</span>
                                <span>At - {slot.start} - {slot.end}</span>
                            </div>
                            <div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}