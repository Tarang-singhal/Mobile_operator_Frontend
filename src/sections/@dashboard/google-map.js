import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { LocationOn } from '@mui/icons-material';
import Marker from '../../components/Marker';
import { useNavigate } from "react-router-dom";
import { func } from 'prop-types';

const greatPlaceStyle = {
    position: 'absolute',
    transform: 'translate(-50%, -50%)'
}



export default function Map() {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const { agents = [] } = useSelector(state => state.agent);

    const onClickAgent = (agent) => {
        navigate('/dashboard/booking', { state: agent })
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '85vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
                defaultCenter={{ lat: 32, lng: 32 }}
                center={{ lat: user.lat, lng: user.lng }}
                yesIWantToUseGoogleMapApiInternals
                defaultZoom={20}
                options={{ fullscreenControl: false }}
            >

                <LocationOn
                    style={greatPlaceStyle}
                    color="primary"
                    fontSize="large"
                    lat={user.lat}
                    lng={user.lng}
                    text="You"
                />

                {
                    agents.length > 0 && agents.map((agent) => {
                        return (
                            agent._id != user._id && <Marker
                                title={agent.name}
                                lat={agent.lat}
                                lng={agent.lng}
                                onClick={() => { onClickAgent(agent) }}
                            />
                        )
                    })
                }



            </GoogleMapReact>
        </div>
    )
}