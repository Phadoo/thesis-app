import React, { useState } from "react";
import "./Sidebar.css";
import "@fontsource/inter";
import { Link, NavLink } from "react-router-dom";
import { SideBarData } from "./SideBarData";

function Sidebar() {
  const defaultActiveItem = 0;
  const [activeItem, setActiveItem] = useState(defaultActiveItem);

  const handleItemClick = (key) => {
    setActiveItem(key);
  };

  return (
    <div className="sidebar">
      <div>
        <img src="src/assets/icon.ico" alt="" />
      </div>
      <div className="sidebar_menu">
        <div className="menu_label">Menu</div>
        <div className="interface_label">Interface</div>
      </div>
      <ul className="sidebarlist">
        {SideBarData.map((val, key) => {
          return (
            <li
              key={key}
              className={`row ${activeItem === key ? "active" : ""}`}
              onClick={() => handleItemClick(key)}
            >
              <Link
                to={val.link}
                style={{ textDecoration: "none", color: "white" }}
              >
                <div
                  id="icon"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "27px",
                  }}
                >
                  {val.icon}
                  <span style={{ marginLeft: "20px" }}>{val.title}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
