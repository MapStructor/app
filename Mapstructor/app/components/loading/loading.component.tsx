import React from 'react';

type LoaderProps = {
  center: boolean,
}
const Loader = (props: LoaderProps) => {
  return (
    <>
    {props.center ? (
      <div className="loader-container-center">
        <div className="loader"></div>  
      </div>
    ) : (
      <div className="loader-container">
        <div className="loader"></div>  
      </div>
    )}
    </>
  );
};

export default Loader;