import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { LocationOn } from '@mui/icons-material';
import Marker from '../../components/Marker';

const greatPlaceStyle = {
    position: 'absolute',
    transform: 'translate(-50%, -50%)'
}



export default function Map() {
    const { user } = useSelector(state => state.auth)
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '80vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCkRAcHh2YWDHSYBdOeq9LGcIPuH9gBGbM" }}
                defaultCenter={{ lat: 32, lng: 32 }}
                center={{ lat: user.lat, lng: user.lng }}
                yesIWantToUseGoogleMapApiInternals
                defaultZoom={17}
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



            </GoogleMapReact>
        </div>
    )
}