// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
    loginRequired: true
  },
  {
    title: 'bookings',
    path: '/bookings',
    icon: getIcon('fluent:wallet-credit-card-16-regular'),
    loginRequired: true
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
    loginRequired: false
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
    loginRequired: false
  },
];

export default sidebarConfig;
