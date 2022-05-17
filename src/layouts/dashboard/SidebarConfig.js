// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
    loginRequired: true,
    userTypes: ["user", "agent"]
  },
  {
    title: 'bookings',
    path: '/bookings',
    icon: getIcon('fluent:apps-list-20-filled'),
    loginRequired: true,
    userTypes: ["user", "agent"]
  },
  {
    title: 'wallet',
    path: '/wallet',
    icon: getIcon('fluent:wallet-credit-card-16-regular'),
    loginRequired: true,
    userTypes: ["user"]
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
    loginRequired: false,
    userTypes: []
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
    loginRequired: false,
    userTypes: []
  },
];

export default sidebarConfig;
