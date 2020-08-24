import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { InfoWindow, withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { List, Button } from 'antd';
import '../styles/listing-styles.css'

const apiKey = 'AIzaSyC0rTgUMIqtPBfwM7oFkvQZ3ZAskgTX0F4';

class HomeListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			lat: '',
			lng: ''
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
			<GoogleMap defaultZoom={10} defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}>
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
	render() {
		console.log(this.props.homes.listings);
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
										extra={<img width={272} alt="logo" src={`${item.details.images[0]}`} />}
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
							googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
							loadingElement={<div style={{ height: `100%` }} />}
							containerElement={<div style={{ height: `100%` }} />}
							mapElement={<div style={{ height: `100%` }} />}
						/>
					</div>
				) : null}
			</div>
		);
	}
}

export default HomeListItem;
