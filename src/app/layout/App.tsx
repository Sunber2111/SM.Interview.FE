// react
import React, { Fragment } from 'react';

// 3th party
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// app
import SortArray from 'features/sort-array';

const App = () => {
  return (
    <Fragment>
      <ToastContainer />
      <SortArray />
    </Fragment>
  );
};

export default App;
