import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import { handleUserUpdateAction } from '../redux/actions/auth.action';
// import MyMapComponent from '../sections/@dashboard/map';

// components
import Page from '../components/Page';
import Map from '../sections/@dashboard/google-map';

export default function DashboardApp() {

  const [loadingLocation, setLoadingLocation] = useState(true);
  const { user, isLoggedIn } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const [loadingOpLocation, setLoadingOpLocation] = useState(true);
  const [opLocations, setOpLocations] = useState([{ id: 1, lat: 32, lng: 32, slots: [{ start: "09:30AM", end: "10:30AM", available: false }, { start: "11:30AM", end: "12:01PM", available: true }] }])

  const [selectedOp, setSelectedOp] = useState({})

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      if (isLoggedIn) {
        dispatch(handleUserUpdateAction({
          ...user,
          lat: latitude,
          lng: longitude
        }))
      }
      setLoadingLocation(false)
      console.log(latitude, longitude)
    })


  }, [isLoggedIn])

  useEffect(() => {

    async function fetchOpLocations() {
      //



      setLoadingOpLocation(false);
    }

    fetchOpLocations();
  }, [])

  // const PopHover = () => {
  //   return (
  //     <Popover
  //       id="mouse-over-popover"
  //       sx={{
  //         pointerEvents: 'none',
  //       }}
  //       // open={open}
  //       // anchorEl={anchorEl}
  //       anchorOrigin={{
  //         vertical: 'bottom',
  //         horizontal: 'left',
  //       }}
  //       transformOrigin={{
  //         vertical: 'top',
  //         horizontal: 'left',
  //       }}
  //       // onClose={handlePopoverClose}
  //       disableRestoreFocus
  //     >
  //       <Typography sx={{ p: 1 }}>I use Popover.</Typography>
  //     </Popover>
  //   )
  // }

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        {/* <MyMapComponent
          lat={location.lat}
          lng={location.lng}
          opLocations={opLocations}
          setSelectedOp={setSelectedOp}
          selectedOp={selectedOp}
        /> */}
      </Container>
      <Map />
    </Page>
  );
}
