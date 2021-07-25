import React from "react";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">Home</a>
      </Menu.Item>
      <SubMenu title={<span>Blogs</span>}>
        <MenuItemGroup title="Item 1">
          <Menu.Item key="register">
            <a href="/register">register</a>
          </Menu.Item>
          <Menu.Item key="Login">
            <a href="/login">Login</a>
          </Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="Item 2">
          <Menu.Item key="subscription">
            <a href="/subscription">Subscription</a>
          </Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  );
}

export default LeftMenu;
