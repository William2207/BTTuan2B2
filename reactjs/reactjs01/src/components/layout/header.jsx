import React, { useContext, useState } from "react";
import {
  UsergroupAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { AuthContext } from "../context/auth.context";

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext); // Thêm auth vào destructuring
  const [current, setCurrent] = useState("home");

  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    ...(auth.isAuthenticated
      ? [
          {
            label: <Link to="/user">Users</Link>,
            key: "user",
            icon: <UsergroupAddOutlined />,
          },
        ]
      : []),
    {
      label: `Welcome ${auth?.user?.email ?? ""}`,
      key: "subMenu",
      icon: <SettingOutlined />,
      children: [ // Sửa từ Children thành children (lowercase)
        ...(auth.isAuthenticated
          ? [
              {
                label: (
                  <span
                    onClick={() => {
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
                    }}
                  >
                    Logout
                  </span>
                ),
                key: "logout",
                icon: <LogoutOutlined />,
              },
            ]
          : [
              {
                label: <Link to="/login">Login</Link>,
                key: "login",
                icon: <LoginOutlined />,
              },
            ]),
      ],
    },
  ];

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div style={{ width: '100%', position: 'sticky', top: 0, zIndex: 1000 }}>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        theme="dark"
        items={items}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default Header;