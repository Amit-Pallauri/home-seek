import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined
} from '@ant-design/icons';

import RegisterationPage from '../pages/RegisterationPage';
import LoginPage from '../pages/LoginPage';
import '../styles/NavBar.css';
import HomePage from '../pages/HomePage';
import UnVerifiedHomesPage from '../pages/UnVerifiedHomesPage';
import VerifyHomesPage from '../pages/VerifyHomesPage';
import UserRequestPage from '../pages/UserRequestPage';
import UpdateHome from './UpdateHome';
import {logOut} from '../store/adminReducer';
import NormalRequestPage from '../pages/NormalRequestPage';
import ProfilePage from '../pages/ProfilePage';
import UserStayHistory from '../pages/UserStayHistory';

const { Header, Sider, Content } = Layout;
class NavBar extends Component {
	state = {
		collapsed: false
	};

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	};

	handleClick = () => {
		this.props.logOut()
	}
	render() {
		return (
			<div>
				<Layout>
					<Sider
						trigger={null}
						collapsible
						collapsed={this.state.collapsed}
						style={{
							overflow: 'auto',
							height: '100vh',
							position: 'fixed',
							left: 0
						}}
					>
						<div className="logo" />
						<Menu theme="dark" mode="inline" defaultSelectedKeys={[ '1' ]}>
							<Menu.Item key="1" icon={<UserOutlined />}>
								<Link to="/">Home</Link>
							</Menu.Item>
							<Menu.Item key="2" icon={<VideoCameraOutlined />}>
                                <Link to="/ownerhouses">Owner homes</Link>
							</Menu.Item>
							<Menu.Item key="3" icon={<UploadOutlined />}>
                                <Link to="/servicerequests">Service Request</Link>
							</Menu.Item>
							<Menu.Item key="4" icon={<UploadOutlined />}>
                                <Link to="/visitrequests">Visit Request</Link>
							</Menu.Item>
							<Menu.Item key="5" icon={<UploadOutlined />}>
                                <Link to="/profile">Profile</Link>
							</Menu.Item>
							<Menu.Item key="6" icon={<UploadOutlined />}>
                                <Link to="/userstay">userstay</Link>
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout className="site-layout" style={{ marginLeft: !this.state.collapsed ? 200 : 70 }}>
						<Header className="site-layout-background" style={{ padding: 0 }}>
							{React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
								className: 'trigger',
								onClick: this.toggle
							})}
							{!this.props.admin ? (
								<>
									<Link to="/register">
										<Button style={{ marginLeft : !this.state.collapsed ? 1050 : 1200 }}>Register</Button>
									</Link>
									<Link to="/login">
										<Button style={{ marginLeft: 25 }}>Login</Button>
									</Link>
								</>
							) : (
								<>
								<Button style={{ marginLeft: !this.state.collapsed ? 1050 : 1200, marginRight: 15 }} onClick={this.handleClick} >Logout</Button>
								</>
							)}
						</Header>
						<Content
							className="site-layout-background"
							style={{
								margin: '24px 16px',
								padding: 24,
								minHeight: 280
							}}
						>
							<Switch>
								<Route exact path="/" component={HomePage} />
								<Route exact path="/register" component={RegisterationPage} />
								<Route exact path="/login" component={LoginPage} />
                                <Route exact path="/ownerhouses" component={UnVerifiedHomesPage} />
                                <Route exact path="/ownerhouses/create/:homeId" component={VerifyHomesPage} />
                                <Route exact path="/servicerequests" component={UserRequestPage} />
								<Route exact path="/ownerhouses/update/:homeId" component={UpdateHome}/>
								<Route exact path="/visitrequests" component={NormalRequestPage} />
								<Route exact path="/profile" component={ProfilePage} />
								<Route exact path="/userstay" component={UserStayHistory}/>
                                <Redirect to="/" />
							</Switch>
						</Content>
					</Layout>
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = (storeState) => {
	return { admin: storeState.features.admin.admin };
};

export default connect(mapStateToProps, {logOut})(NavBar);
