import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';

// material
import { Container, Button } from '@mui/material';
// component
// import Iconify from '../../components/Iconify';
import Page from '../components/Page';



// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex'
    }
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '80vh',
    flexDirection: 'column',
    padding: theme.spacing(6, 0)
}));

export default function AddMoney() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)


    const navigateToDashboard = () => {
        navigate('/wallet/addMoney', { replace: true })
    }


    return (
        <RootStyle title="Add Money | Wallet">
            <Container>
                <ContentStyle>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '22px' }}>
                            ₹ {user.walletAmount}
                        </span>
                        <span>
                            <Button variant='contained' onClick={() => navigateToDashboard()}>
                                Add Money
                            </Button>
                        </span>
                    </div>
                    <hr style={{ margin: "20px 10px", color: "#eee" }} />
                    <div>
                        {
                            user.paymentHistory && user.paymentHistory.length > 0 &&
                            <span>Payment History: </span>
                        }
                        {
                            user.paymentHistory && user.paymentHistory.length > 0 && user.paymentHistory.reverse().map(item => {
                                return <div style={{ padding: "10px", borderRadius: "5px", border: "2px solid #eee", margin: "10px", display: "flex", flexDirection: "column" }}>
                                    <span><span style={{ fontSize: "14px" }}>Rupees:</span> <span style={{ color: item.STATUS === "DEB_SUCCESS" ? "red" : "green" }}>{item.TXNAMOUNT}</span></span>
                                    <span><span style={{ fontSize: "14px" }}>Status: {item.STATUS}</span></span>
                                    <span style={{ marginTop: "3px", fontSize: "12px", alignSelf: "flex-end" }}> {dayjs(item.TXNDATE).format("DD MMM YYYY, HH:mm:ss")}</span>
                                </div>
                            })
                        }
                        {/* <FlatList
                            data={user.paymentHistory}
                            renderItem={({ item }) => (
                                <View style={{ padding: 10, elevation: 2, borderRadius: 5, borderWidth: 1, borderColor: "#eee", margin: 10 }}>
                                    <Text>Rupees: {item.TXNAMOUNT}</Text>
                                    <Text>Status: {item.STATUS}</Text>
                                </View>
                            )}
                            keyExtractor={(item) => item.TXNID}
                        /> */}
                    </div>
                </ContentStyle>
            </Container>

        </RootStyle>
    );
}