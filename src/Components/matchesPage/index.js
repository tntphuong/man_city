import React from 'react';
import Zoom from 'react-reveal/Zoom';

const MatchesPage = () => {
  return (
    <div className="bck_blue">
      <div className="promotion_wrapper">
        <div className="promotion_animation">
          <div className="left">
            <Zoom>
              <div style={{ padding: '100px', textAlign: 'center' }}>
                <span>Coming</span>
                <span>soon</span>
              </div>
            </Zoom>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchesPage;
