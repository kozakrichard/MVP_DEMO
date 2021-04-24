import React, { useState } from 'react';

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import { ProSidebar,Menu,MenuItem,SidebarHeader,SidebarFooter,SidebarContent} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import './MenuRight.css';

import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";


const MenuRight = () =>{

    const [menuCollapse, setMenuCollapse] = useState(false);

    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    

    return (
        <>
            <div id="header">
            {/* collapsed props to change menu size using menucollapse state */}
            <ProSidebar collapsed={menuCollapse} rtl = {true}>
            <SidebarHeader>
            <div className="logotext">
                {/* small and big change using menucollapse state */}
                <p>{menuCollapse ? "Menu" : "Nightingale"}</p>
                </div>
                <div className="closemenu" onClick={menuIconClick}>
                    {/* changing menu collapse icon on click */}
                {menuCollapse ? (
                    <FiArrowLeftCircle/>
                ) : (
                    <FiArrowRightCircle/>
                )}
                </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="square">
                <MenuItem active={true} icon={<FiHome />}>
                    Home
                </MenuItem>
                <MenuItem icon={<FaList />}>Log In</MenuItem>
                <MenuItem icon={<FaRegHeart />}>Collaborate</MenuItem>
                <MenuItem icon={<FaRegHeart />}>Your Songs</MenuItem>
                <MenuItem icon={<BiCog />}>Settings</MenuItem>
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                <Menu iconShape="square">
                <MenuItem icon={<FiLogOut />}>Log Out</MenuItem>
                </Menu>
            </SidebarFooter>
            </ProSidebar>
        </div>
        </>
    );
};
export default MenuRight;