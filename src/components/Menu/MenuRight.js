import React, { useState } from 'react';

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Login from './Users/Login.js';
import Collaborate from './UserFeatures/Collaborate.js';
import UserSongs from './UserFeatures/UserSongs.js';
import Settings from './UserFeatures/Settings.js';

import { ProSidebar,Menu,MenuItem,SidebarHeader,SidebarFooter,SidebarContent} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import './MenuRight.css';

import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, 
    FiArrowRightCircle, FiHeadphones, FiUsers } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog, BiLogIn } from "react-icons/bi";
import {AiFillGithub} from "react-icons/ai";


const MenuRight = () =>{

    const [menuCollapse, setMenuCollapse] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    

    return (
        <>
        <Router>
            <div id="header">
            {/* collapsed props to change menu size using menucollapse state */}
            <ProSidebar collapsed={menuCollapse} rtl = {true}>
                <SidebarHeader>
                <div className="logotext">
                    {/* small and big change using menucollapse state */}
                    <p>{menuCollapse ? "Menu" : "Nightingale "}</p>
                    </div>
                    <div className="closemenu" onClick={menuIconClick}>
                        {/* changing menu collapse icon on click */}
                    {menuCollapse ? (
                        <FiArrowRightCircle/>
                    ) : (
                        <FiArrowLeftCircle/>
                    )}
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem active={true} icon={<FiHeadphones />}>
                            Home <Link to= "/"/>
                        </MenuItem>
                        <div class= "collab-btn">
                            <MenuItem icon={<FiUsers />}
                                onMouseEnter={() => setShowMessage(true)}
                                onMouseLeave ={() => setShowMessage(false)}>
                                Collaborate
                            </MenuItem>
                            {showMessage && (
                                <div>
                                    Press ALT + T + T to enable user collaboration
                                </div>
                                )}
                        </div>
                        <MenuItem icon={<AiFillGithub />}>
                            GitHub <Link to="/github"/>
                        </MenuItem>
                        <MenuItem icon={<FaRegHeart />}>
                            About <Link to="/about"/>
                        </MenuItem>
                    </Menu>
                </SidebarContent>
            </ProSidebar>
                <Switch>
                    <Route path='/github' component={() => { 
                        window.location.href = ('https://github.com/nightingale-ai/MVP_DEMO'); 
                        return null;
                    }}/>
                    <Route path="/about">
                        <Settings />
                    </Route>
                </Switch>
            </div>
        </Router>
        </>
    );
};
export default MenuRight;