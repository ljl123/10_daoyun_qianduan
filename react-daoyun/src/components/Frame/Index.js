import React from 'react'
import { Layout, Menu, Breadcrumb, Dropdown, Avatar, message } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { adminRoutes, dicRoutes } from '../../routes';
import { withRouter } from 'react-router-dom'
import { clearToken } from '../../utils/auth';
import './frame.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const routes = adminRoutes.filter(route => route.isShow)
const dicroute = dicRoutes.filter(route => route.isShow)

function Index(props) {
    const popMenu = (
        <Menu
            onClick={p => {
                if (p.key == "logout") {
                    clearToken();
                    props.history.push("/login");
                } else {
                    message.info(p.key); //tip
                }
            }}
        >

            <Menu.Item key="noti">通知中心</Menu.Item>
            <Menu.Item key="setting">设置</Menu.Item>
            <Menu.Item key="logout">退出</Menu.Item>
        </Menu>
    );
    return (
        <Layout>
            <Header className="header">
                <div className="logo" >
                    <span style={{ color: "white", fontSize: "20px" }}>Dao云</span>
                </div>
                <Dropdown overlay={popMenu}>
                    <div>
                        <Avatar>U</Avatar>
                        <span style={{ color: "#fff" }}>管理员</span>

                    </div>
                </Dropdown>
                {/* <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu> */}
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        {routes.map(route => {
                            return (
                                <Menu.Item key={route.path} onClick={p => props.history.push(p.key)}>
                                    {route.title}
                                </Menu.Item>
                            );
                        })}
                        <SubMenu
                            key="sub"
                            title="字典管理"


                        >
                            {dicroute.map(dicroute => {
                                return (
                                    <Menu.Item key={dicroute.path} onClick={p => props.history.push(p.key)}>
                                        {dicroute.title}
                                    </Menu.Item>
                                );
                            })}
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '6px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {props.children}

                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default withRouter(Index)
