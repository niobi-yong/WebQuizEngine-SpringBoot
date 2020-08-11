import React from 'react';

const FooterComponent = () => {
  let styles = {
    position: 'absolute',
    width: '100%',
    height: '60px',
    lineHeight: '60px'
  };

  return (
    <>
      <footer className="bg-dark text-white" style={styles}>
          <div className="container">
              <span>Created by niobi-yong</span>
          </div>
      </footer>
    </>
    );
  };

  export default FooterComponent;