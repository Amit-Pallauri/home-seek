import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { InfoWindow, withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { List, Button, Form, Drawer, Dropdown, Input, Menu, Select, InputNumber} from 'antd';
import { getAllSortedPosts, getFilteredData } from '../redux/actions/listingActions';
import { API_KEY } from '../config'
import '../styles/listing-styles.css'

class HomeListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			lat: '',
			lng: '',
			visible: false,
			city : '',
			state : '',
			type : '' ,
			// sortedValues : [],
			minRent : '',
			maxRent : '',
			rentType : '',
			toBeSortValue: ''
		};
	}

	componentDidMount() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.setState({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				});
			});
		} else {
			console.error('Geolocation is not supported by this browser!');
		}
	}

	handleClick = () => {
		this.setState({ active: !this.state.active });
	};

	MapWithAMarker = withScriptjs(
		withGoogleMap((props) => (
			<GoogleMap defaultZoom={10} defaultCenter={{ lat: Number(this.state.lat), lng: Number(this.state.lng) }}>
				{this.props.homes.listings.map((home) => (
					<Marker
						key={home._id}
						position={{
							lat: home.details.location.coordinates[0],
							lng: home.details.location.coordinates[1]
						}}
						onClick={this.handleClick1}
					>
						<InfoWindow>
							<div>
								<span style={{ padding: 0, margin: 0, fontSize: 20 }}>{`₹${home.details.rent}`}</span>
							</div>
						</InfoWindow>
					</Marker>
				))}
			</GoogleMap>
		))
	);

	// componentDidUpdate(prevProps) {
	// 	if(prevProps !== this.props){
	// 		this.props.posts.sortedValues 
	// 		?
	// 			this.setState({ sortedValues : this.props.posts.sortedValues.data})
	// 		: console.log('none')
	// 	}
	// }

	showDrawer = () => {
		this.props.getAllSortedPosts()
		this.setState({
			visible: true,
		});
	};

	onClose = () => {
		this.setState({
		visible: false,
		});
	};

	changeHandle = e => {
		// console.log(e.target.value.toString())
		this.setState({ toBeSortValue : e })
	}
	 handleChange = e => {
		 this.setState({[e.target.name] : e.target.value})
	 }

	handleSubmit = e => {
		e.preventDefault()
		console.log('i am here')
		const { maxRent, toBeSortValue : location, minRent, rentType : type } = this.state
		this.props.getFilteredData({maxRent, minRent, location, type})
	}

	handleTypeClick = e => {
		// console.log(e.target.name.toString())
		this.setState({rentType : e})
	}

	render() {
		const typeMenu = (
			<Menu>
				<Menu.Item>
					<Button onClick={() => this.handleTypeClick('family')}>family</Button>
				</Menu.Item>
				<Menu.Item>
					<Button onClick={() => this.handleTypeClick('bachelor')}>bachelor</Button>
				</Menu.Item>
			</Menu>
		)

		const locationMenu = (
			<Menu>
				{
					this.props.posts.sortedValues 
					? 
					this.props.posts.sortedValues.data.city.map(el =>
						<Menu.Item>
							<Button onClick={() => this.changeHandle(el)}>{el}</Button>
						</Menu.Item>
					)
					: null
				}
				
			</Menu>
		)
		return (
			<div style={{ display: 'flex' }}>
				<Button type="primary" onClick={this.handleClick}>
					{!this.state.active ? 'Map View' : 'Grid View'}
				</Button>
				<div style={{ width: !this.state.active ? '100%' : '60%' }}>
					<List 
						itemLayout="vertical"
						size="large"
						pagination={{
							onChange: (page) => {
								console.log(page);
							},
							pageSize: 10
						}}
						dataSource={this.props.homes.listings}
						renderItem={(item) => (
							<div>
								<Link to={`/home/details/${item._id}`}>
									<List.Item
										className='home-list'
										key={item._id}
										actions={[ <Button type="primary">Book Visit</Button> ]}
										extra={<img width={272} alt="logo" src={item.details.images[0]} />}
									>
										<List.Item.Meta
											title={`₹${item.details.rent}`}
											description={item.details.projectName}
										/>
										<p>Deposit: {item.details.deposit}</p>
										<p>owner: {item.name}</p>
									</List.Item>
								</Link>
							</div>
						)}
					/>
				</div>
				{this.state.active ? (
					<div className="geoLocation" style={{ width: '50%' }}>
						<this.MapWithAMarker
							googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
							loadingElement={<div style={{ height: `100%` }} />}
							containerElement={<div style={{ height: `100%` }} />}
							mapElement={<div style={{ height: `100%` }} />}
						/>
					</div>
				) : null}
				<div>
				<Button type="primary" onClick={this.showDrawer}>
					sort homes
				</Button>
				<Drawer
					title="Basic Drawer"
					placement="right"
					closable={false}
					onClose={this.onClose}
					visible={this.state.visible}
				>
					<Form>
						<Dropdown overlay={locationMenu} placement="bottomLeft">
							<Button>Location</Button>
						</Dropdown>
						<Dropdown overlay={typeMenu} placement="bottomLeft">
							<Button>Type</Button>
						</Dropdown>
						<Form.Item label='min. Rent'>
							<input
								type="number"
								name='minRent'
								value={this.state.minRent}
								onChange={this.handleChange}
							/>
						</Form.Item>
						<Form.Item label='max. Rent'>
							<input
								type="number"
								name='maxRent'
								value={this.state.maxRent}
								onChange={this.handleChange}
							/>
						</Form.Item>
						<Form.Item>
							<button onClick={this.handleSubmit}>
								Submit
							</button>
						</Form.Item>
					</Form>
				</Drawer>
				</div>
			</div>
		);
	}
}

const mapStateToProps = stateStatus => {
	return {
		posts : stateStatus.listingState
	}
}

export default connect (mapStateToProps, { getAllSortedPosts, getFilteredData })(HomeListItem);