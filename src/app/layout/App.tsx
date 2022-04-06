import React, { Fragment } from 'react'
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import SortArray from 'features/sort-array'

const App = () => {
  return (
    <Fragment>
      <ToastContainer />
      <SortArray/>
    </Fragment>
  )
}

export default App