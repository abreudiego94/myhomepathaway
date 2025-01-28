import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Outlet } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/react-router-dom';

const NAVIGATION: any = [
  {
    kind: 'header',
    title: 'Menu',
  },
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
    
  },
 
 
];


export default function App() {
  return (
    <AppProvider navigation={NAVIGATION} branding={{
      title: '',
      logo: <img src="logo.png" alt="Minha Logo" style={{ height: '40px' }} />
    }}>
      <Outlet />
    </AppProvider>
  );
}