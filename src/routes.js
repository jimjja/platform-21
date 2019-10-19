import React from 'react';
import Play from './Pages/Play';
import HowTo from './Pages/HowTo';

const routes = [
  {
    component: (props) => <Play {...props} />,
    path: '/',
    exact: true,
    label: 'Home',
  },
  {
    path: '/how-to',
    label: 'How to play',
    exact: true,
    component: (props) => <HowTo {...props} />,
  },
];

export default routes;
