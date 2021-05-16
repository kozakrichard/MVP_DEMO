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


const MenuRight = () =>{

    const [menuCollapse, setMenuCollapse] = useState(false);

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
                        <MenuItem active={true} icon={<FiHeadphones />}>
                            Home <Link to= "/"/>
                        </MenuItem>
                        <MenuItem icon={<BiLogIn />}>
                            Log In <Link to ="/login"/>
                        </MenuItem>
                        <MenuItem icon={<FiUsers />}>
                            Collaborate <Link to="/collaborate"/>
                        </MenuItem>
                        <MenuItem icon={<FaRegHeart />}>
                            Your Songs <Link to="usersongs"/>
                        </MenuItem>
                        <MenuItem icon={<BiCog />}>
                            Settings <Link to="settings"/>
                        </MenuItem>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <Menu iconShape="square">
                    <MenuItem icon={<FiLogOut />}>Log Out</MenuItem>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
                <Switch>
                    <Route path="/collaborate">
                        <Collaborate />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/usersongs">
                        <UserSongs />
                    </Route>
                    <Route path="/settings">
                        <Settings />
                    </Route>
                </Switch>
            </div>
        </Router>
        </>
    );
};
export default MenuRight;