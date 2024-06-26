// Sidebar.js
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SideBarData } from "./SideBarData";

// Styled components
const SidebarContainer = styled.div`
  min-height: 100vh;
  width: 270px;
  background-color: #858585;
  transition: left 0.3s ease-in-out, width 0.3s ease-in-out;
  position: fixed;
  top: 0;

  z-index: 1000;

  @media (max-width: 768px) {
    width: 100vw;
    min-height: 300px;
  }
`;

const SidebarList = styled.ul`
  height: auto;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarItem = styled.li`
  & a {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    padding: 0 15px;

    &:hover #icon,
    &.active #icon {
      color: #4d4d4d;
    }
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  margin-left: 27px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const SidebarMenu = styled.div`
  padding: 30px;
`;

const MenuLabel = styled.div`
  color: white;
  font-weight: bolder;
  font-size: xx-large;
`;

const InterfaceLabel = styled.div`
  color: white;
  font-weight: 100;
  font-size: smaller;
`;

const SidebarToggle = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1100;
  background-color: #111;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #575757;
  }
`;

const Sidebar = () => {
  const defaultActiveItem = 0;
  const [activeItem, setActiveItem] = useState(defaultActiveItem);
  const [isOpen, setIsOpen] = useState(true);

  const handleItemClick = (key) => {
    setActiveItem(key);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <div>
          <img src="src/assets/icon.ico" alt="" />
        </div>
        <SidebarMenu>
          <MenuLabel>Menu</MenuLabel>
          <InterfaceLabel>Interface</InterfaceLabel>
        </SidebarMenu>
        <SidebarList>
          {SideBarData.map((val, key) => (
            <SidebarItem
              key={key}
              className={activeItem === key ? "active" : ""}
              onClick={() => handleItemClick(key)}
            >
              <Link
                to={val.link}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Icon id="icon">{val.icon}</Icon>
                <Title id="title">{val.title}</Title>
              </Link>
            </SidebarItem>
          ))}
        </SidebarList>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
