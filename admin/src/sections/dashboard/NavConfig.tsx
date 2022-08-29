// component
import Icone from '../../components/Icon';

// ----------------------------------------------------------------------

const getIcon: any = (name: any) => <Icone icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'customers',
    path: '/dashboard/customers',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'products',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Account',
    path: '/dashboard/account',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
