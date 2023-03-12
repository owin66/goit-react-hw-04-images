import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import css from '../styles.module.css';

const Loader = () => (
  <div className={css.loader}>
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="blue"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass="loader"
      visible={true}
    />
  </div>
);

export default Loader;
