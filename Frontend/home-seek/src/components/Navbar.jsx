import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined
} from '@ant-design/icons';
import protectedRoute from '../HOC/protectedRoute'
import '../styles/navbar.css';
import RegisterPage from '../pages/RegisterPage';
import Loginpage from '../pages/LoginPage';
import Homepage from '../pages/Homepage';
import DetailPage from '../pages/DetailPage';
import ListingPage from '../pages/ListingPage';
import ChatPage from '../pages/ChatPage';
import ForgotPassword from '../pages/ForgotPassword';
import RevivePassword from '../pages/RevivePassword';
import {logoutUser} from '../redux/actions/userActions';
import Requests from '../pages/Requests';
import ProfilePage from '../pages/ProfilePage';
import HomeListPage from '../pages/HomeListPage';

const { Header, Sider, Content } = Layout;

class Navbar extends Component {
	state = {
		collapsed: false
	};

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	};

	handleClick = () => {
		this.props.logoutUser();
	};
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
							<Menu.Item key="2" icon={<UploadOutlined />}>
								<Link to="/profile">Profile</Link>
							</Menu.Item>
							<Menu.Item key="3" icon={<VideoCameraOutlined />}>
								<Link to="/owner/listing/create">Listings</Link>
							<Menu.Item key="4" icon={<UploadOutlined />}>
								<Link to="/homes">Search Home</Link>
							</Menu.Item>
							<Menu.Item key="5" icon={<UploadOutlined />}>
								<Link to="/requests">requests</Link>
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout className="site-layout" style={{ marginLeft: !this.state.collapsed ? 200 : 70 }}>
						<Header className="site-layout-background" style={{ padding: 0 }}>
							{React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
								className: 'trigger',
								onClick: this.toggle
							})}
							{!this.props.user ? (
								<>
									<Link to="/signUp">
										<Button style={{ marginLeft : !this.state.collapsed ? 1050 : 1200 }}>Register</Button>
									</Link>
									<Link to="/signIn">
										<Button style={{ marginLeft: 25 }}>Login</Button>
									</Link>
								</>
							) : (
								<>
									<Button style={{ marginLeft: !this.state.collapsed ? 1050 : 1200, marginRight: 15 }} onClick={this.handleClick}>
										Logout
									</Button>
                                    <Link to="/chat">
										<Button style={{ marginLeft: 25 }}>chat</Button>
									</Link>
								</>
							)}
						</Header>
						<Content
							className="site-layout-background"
							style={{
								// height: '80vh',
								margin: '24px 16px',
								padding: 24,
								minHeight: 280
							}}
						>
							<Switch>
								<Route exact path="/" component={Homepage} />
								<Route exact path="/signUp" component={RegisterPage} />
								<Route exact path="/signIn" component={Loginpage} />
								<Route exact path="/forgotPassword" component={ForgotPassword} />
								<Route exact path="/revivePassword/:token" component={RevivePassword}/>
								<Route exact path="/chat" component={protectedRoute(ChatPage)} />
								<Route exact path="/owner/listing/create" component={protectedRoute(ListingPage)} />
								<Route exact path='/requests' component={protectedRoute(Requests)} />
								<Route exact path='/profile' component={protectedRoute(ProfilePage)}/>
								<Route exact path="/homes" component={protectedRoute(HomeListPage)} />
								<Route exact path="/home/details/:homeId" component={protectedRoute(DetailPage)}/>
							</Switch>
						</Content>
					</Layout>
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = (storeState) => {
	return { user: storeState.userState.user };
};

export default connect(mapStateToProps,{logoutUser})(Navbar);
