// routes
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Router from './routes';
import { io } from "socket.io-client";
import ThemeConfig from './theme';
import { useSelector, useDispatch } from 'react-redux';
import GlobalStyles from './theme/globalStyles';
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { loggedInUser } from './redux/actions/auth.action';
// ----------------------------------------------------------------------

const SERVER_URL = process.env.REACT_APP_API_URL

export default function App() {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!isLoggedIn && !token) {
      navigate('/', { replace: true })
    } else {
      // const userData = JwtDecode(token);
      // dispatch(loggedInUser(userData));
      dispatch(loggedInUser(JSON.parse(token)));
      navigate('/dashboard/app', { replace: true })
    }
    const socket = io(SERVER_URL);
    socket.emit('connected')
  }, [isLoggedIn])

  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
