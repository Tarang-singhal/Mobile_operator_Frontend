// routes
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Router from "./routes";
import { io } from "socket.io-client";
import ThemeConfig from "./theme";
import { useSelector, useDispatch } from "react-redux";
import GlobalStyles from "./theme/globalStyles";
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";
import { loggedInUser, handleGetUserData } from "./redux/actions/auth.action";
import { getActiveAgents } from './redux/actions/agent.action';
// ----------------------------------------------------------------------

const SERVER_URL = process.env.REACT_APP_API_URL;

export default function App() {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getActiveAgents())
    }, 5000)
  })

  useEffect(() => {
    const token = localStorage.getItem("token");
    var socket = io(SERVER_URL);
    if (!isLoggedIn && !token) {
      navigate("/", { replace: true });
    } else if (!isLoggedIn && token) {
      console.log("🚀 ~ file: App.js ~ line 19 ~ App ~ isLoggedIn", isLoggedIn);
      dispatch(handleGetUserData(JSON.parse(token)._id));
      navigate("/dashboard/app");
      socket.emit("connected", {
        user: JSON.parse(token),
      });
      // socket.on("disconnect", () => {
      //   socket.emit("disconnected", {
      //     user: JSON.parse(token),
      //   });
      // });
    }
  }, []);

  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
