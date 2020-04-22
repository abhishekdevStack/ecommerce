import React from "react";
import "./menuitem.styles.scss";
import { withRouter } from "react-router-dom";
const MenuItem = ({ title, imageUrl, size, linkUrl, history }) => {
  return (
    <div className={`${size} menu-item`} onClick={() => history.push(linkUrl)}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="content">
          <div className="title">{title.toUpperCase()}</div>
          <span className="subtitle">SHOP NOW</span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);
