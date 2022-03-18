import React from 'react';
import { compose, withProps, withStateHandlers } from "recompose"
import { LocationCity } from '@mui/icons-material';
import { Box, Grid, Container, Typography, Popover } from '@mui/material';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox";


const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `80vh` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withStateHandlers(() => ({
        isOpen: false,
    }), {
        onToggleOpen: ({ isOpen }) => () => ({
            isOpen: !isOpen,
        })
    }),
    withScriptjs,
    withGoogleMap
)(({ lat, lng, opLocations = [], setSelectedOp, selectedOp, onToggleOpen, isOpen }) =>
    <GoogleMap
        defaultZoom={8}
        center={{ lat, lng }}
        defaultCenter={{ lat, lng }}
        zoom={15}
    >

        <Marker position={{ lat, lng }} />

        <InfoBox
            defaultPosition={new google.maps.LatLng(lat, lng)}
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
        >
            <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
                <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                    Hello, Taipei!
                </div>
            </div>
        </InfoBox>

        {
            opLocations.map(operator =>
                <Marker
                    position={{ lat: operator.lat, lng: operator.lng }}
                    onMouseOver={() => { onToggleOpen(false); }}
                    onMouseOut={() => { onToggleOpen(true); }}
                    onClick={() => { setSelectedOp(operator); console.log(operator) }}
                />
            )
        }

    </GoogleMap>
)


export default MyMapComponent