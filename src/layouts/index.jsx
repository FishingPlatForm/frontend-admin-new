import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import "./LayoutStyles.css"
import routeList from "../router";
import { withRouter, Route, Switch, } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const LayoutComponent = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();
  const onClick =(e)=> props.history.replace( routeList.filter( k=> e.key === k.key )?.[0]?.link);
  return (
    <Layout className='layoutBox'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          onClick={onClick}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['fishpond']}
          items={routeList}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <Button onClick={()=>{ 
           localStorage.clear();
           sessionStorage.clear();
           props.history.replace("/login");
           }}>退出登录</Button>
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflowY:"scroll"
          }}
        >
          <Switch>
            {
              routeList.map((item, key) => {
                return (
                  <Route
                    key={key}
                    path={item?.link}
                    component={item?.component}
                  />
                )
              })
            }
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};
export default withRouter(LayoutComponent);
