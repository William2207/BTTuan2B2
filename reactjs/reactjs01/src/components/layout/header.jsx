import React, {Children, useContext,useState} from "react";
import {UsergroupAddOutlined,LoginOutlined,LogoutOutlined, HomeOutlined, SettingOutlined} from "@ant-design/icons";
import { Link,useNavigate } from "react-router-dom";
import {Menu} from "antd";
import { AuthContext } from "../context/auth.context";
import { icons } from "antd/es/image/PreviewGroup";

const Header = () => {
    const navigate = useNavigate();
    const {isAuthenticated,setAuth} = useContext(AuthContext);
    const items = [
        {
            label: <Link to="/">Home</Link>,
            key: "home",
            icon: <HomeOutlined />,
        },
        ...(auth.isAuthenticated ? [
            {
                label: <Link to="/user">Users</Link>,
            key: "user",
            icon: <UsergroupAddOutlined />,
            }] : []),
        {
            label: `Welcome ${auth?.user?.email?? ""}`,
            key: "subMenu",
            icon: <SettingOutlined />,
            Children: [
                ...(auth.isAuthenticated ? [{
                label: <span onClick={()=>{
                    localStorage.clear("access_token");
                    setCurrent("home");
                    setAuth({
                        isAuthenticated: false,
                        user: {
                            email: "",
                            name: "",
                        },
                    });
                    navigate("/");
                }}>Logout</span>,
                key: "logout",
                }] : [
                    {
                        label: <Link to="/login">Login</Link>,
                        key: "login",
                    },
                ]),    
            ],
        },
        
    ];
    const [current,setCurrent] = useState("home");
    const onClick = (e) => {
        setCurrent(e.key);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" theme="dark" items={items} />;
};
export default Header;    