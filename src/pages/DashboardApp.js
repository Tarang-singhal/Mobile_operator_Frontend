import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import { handleUserUpdateAction } from '../redux/actions/auth.action';
// import MyMapComponent from '../sections/@dashboard/map';

// components
import Page from '../components/Page';
import Map from '../sections/@dashboard/google-map';
import { getActiveAgents } from 'src/redux/actions/agent.action';

export default function DashboardApp() {

  const { user, isLoggedIn } = useSelector(state => state.auth)
  const [loadingLocation, setLoadingLocation] = useState(true);
  const dispatch = useDispatch();


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
    dispatch(getActiveAgents())
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
