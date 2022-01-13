import React from 'react';
import PropTypes from 'prop-types';

export default function Page({ children }) {
  return (
    <div>
      <p>Hello i am a component</p>
      {children}
    </div>
  );
}
Page.propTypes = {
  children: PropTypes.any,
};
