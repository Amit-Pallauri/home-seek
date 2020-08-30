import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { listingHouse, createOTP, verifyOTP } from '../redux/actions/listingActions';
import { InfoWindow, withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import Geocode from 'react-geocode';
import Autocomplete from 'react-google-autocomplete';
import { API_KEY } from '../config'
import '../styles/listing-styles.css';
import {
	Form,
	Input,
	Button,
	message,
	Typography
  } from 'antd';
import '../styles/listing-styles.css'
const { Title } = Typography;

Geocode.setApiKey(API_KEY);
Geocode.enableDebug();

class ListingPage extends Component {
	state = {
		location: '',
		ownerShip: '',
		societyName: '',
		vacant: '',
		name: '',
		phoneNumber: '',
		confirmPhoneNumber: '',
		code: '',
		address: '',
		city: '',
		area: '',
		state: '',
		zoom: 15,
		height: 400,
		mapPosition: {
			lat: 0,
			lng: 0
		},
		markerPosition: {
			lat: 0,
			lng: 0
		},
		componentSize: 'default'
	};

	componentDidMount() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.setState(
					{
						mapPosition: {
							lat: position.coords.latitude,
							lng: position.coords.longitude
						},
						markerPosition: {
							lat: position.coords.latitude,
							lng: position.coords.longitude
						}
					},
					() => {
						Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
							(response) => {
								console.log(response);
								const address = response.results[0].formatted_address,
									addressArray = response.results[0].address_components,
									city = this.getCity(addressArray),
									area = this.getArea(addressArray),
									state = this.getState(addressArray);
								console.log('city', city, area, state);
								this.setState({
									address: address ? address : '',
									area: area ? area : '',
									city: city ? city : '',
									state: state ? state : ''
								});
							},
							(error) => {
								console.error(error);
							}
						);
					}
				);
			});
		} else {
			console.error('Geolocation is not supported by this browser!');
		}
	}

	getCity = (addressArray) => {
		let city = '';
		for (let i = 0; i < addressArray.length; i++) {
			if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
				city = addressArray[i].long_name;
				return city;
			}
		}
	};

	getArea = (addressArray) => {
		let area = '';
		for (let i = 0; i < addressArray.length; i++) {
			if (addressArray[i].types[0]) {
				for (let j = 0; j < addressArray[i].types.length; j++) {
					if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
						area = addressArray[i].long_name;
						return area;
					}
				}
			}
		}
	};

	getState = (addressArray) => {
		let state = '';
		for (let i = 0; i < addressArray.length; i++) {
			for (let i = 0; i < addressArray.length; i++) {
				if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
					state = addressArray[i].long_name;
					return state;
				}
			}
		}
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const user = JSON.parse(localStorage.getItem('user'))
		const data = {
			location: {
				type: "Point",
				coordinates: [this.state.mapPosition.lat, this.state.mapPosition.lng],
				city : this.state.city,
				state : this.state.state,
				formattedAddress: this.state.address,
			},
			ownerShip: this.state.ownerShip,
			societyName: this.state.societyName,
			vacant: this.state.vacant,
			name: this.state.name,
			phoneNumber: this.state.phoneNumber !== '' ? this.state.phoneNumber : user.data.phoneNumber
		};
		this.props.listingHouse(data);
	};

	handleGetOTP = () => {
		if (this.state.phoneNumber === this.state.confirmPhoneNumber) {
			const data = {
				phoneNumber: `91${this.state.phoneNumber}`
			};
			this.props.createOTP(data);
		} else {
			alert('PhoneNumber must be Same');
		}
	};

	handleSubmit1 = () => {
		const data = {
			phoneNumber: `91${this.state.phoneNumber}`,
			code: this.state.code
		};
		this.props.verifyOTP(data);
	};

	onInfoWindowClose = (event) => {};

	onMarkerDragEnd = (event) => {
		let newLat = event.latLng.lat(),
			newLng = event.latLng.lng();

		Geocode.fromLatLng(newLat, newLng).then(
			(response) => {
				const address = response.results[0].formatted_address,
					addressArray = response.results[0].address_components,
					city = this.getCity(addressArray),
					area = this.getArea(addressArray),
					state = this.getState(addressArray);
				this.setState({
					address: address ? address : '',
					area: area ? area : '',
					city: city ? city : '',
					state: state ? state : '',
					markerPosition: {
						lat: newLat,
						lng: newLng
					},
					mapPosition: {
						lat: newLat,
						lng: newLng
					}
				});
			},
			(error) => {
				console.error(error);
			}
		);
	};

	onPlaceSelected = (place) => {
		console.log('plc', place);
		const address = place.formatted_address,
			addressArray = place.address_components,
			city = this.getCity(addressArray),
			area = this.getArea(addressArray),
			state = this.getState(addressArray),
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();
		this.setState({
			address: address ? address : '',
			area: area ? area : '',
			city: city ? city : '',
			state: state ? state : '',
			markerPosition: {
				lat: latValue,
				lng: lngValue
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue
			}
		});
	};
	MapWithAMarker = withScriptjs(
        withGoogleMap((props) => (
            <GoogleMap
                defaultZoom={this.state.zoom}
                defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
            >
                <Marker
                    google={this.props.google}
                    draggable={true}
                    onDragEnd={this.onMarkerDragEnd}
                    position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                />
                <InfoWindow
                    onClose={this.onInfoWindowClose}
                    position={{ lat: this.state.markerPosition.lat + 0.0018, lng: this.state.markerPosition.lng }}
                >
                    <div>
                        <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
                    </div>
                </InfoWindow>
                <Marker />
                <Autocomplete
                    style={{
                        width: '100%',
                        height: '40px',
                        paddingLeft: '16px',
                        marginTop: '2px',
                        marginBottom: '2rem'
                    }}
                    onPlaceSelected={this.onPlaceSelected}
                    types={[ '(regions)' ]}
                />
            </GoogleMap>
        ))
	);

	onFormLayoutChange = ({ size }) => {
		this.setState({ componentSize: size });
	};
	render() {
		return this.props.user.data ? (
			<div className="listing-form-conatiner">
				<Title id="heading" level={2}>
					List your property
				</Title>
				<Form
					className="listing-form"
					labelCol={{
						span: 4
					}}
					wrapperCol={{
						span: 14
					}}
					layout="horizontal"
					initialValues={{
						size: this.state.componentSize
					}}
					onValuesChange={this.onFormLayoutChange}
					size={this.state.componentSize}
				>
					<Form.Item label="Name">
						<Input
							type="text"
							name="name"
							onChange={this.handleChange}
							value={this.state.name}
							placeholder="Enter name"
							required
						/>
					</Form.Item>
					<Form.Item label="OwnerShip">
						<Input
							type="text"
							name="ownerShip"
							onChange={this.handleChange}
							value={this.state.ownerShip}
							placeholder="(e.g., manager/owner)"
							required
						/>
					</Form.Item>
					<Form.Item label="Society Name">
						<Input
							type="text"
							name="societyName"
							onChange={this.handleChange}
							value={this.state.societyName}
							placeholder="Enter societyName"
							required
						/>
					</Form.Item>
					<Form.Item label="Vacancy">
						<Input
							type="checkbox"
							name="vacant"
							onChange={(e) => this.setState({ vacant: e.target.checked })}
							value={this.state.vacant}
							placeholder="Enter vacant"
							required
						/>
					</Form.Item>
					<div className="geoLocation" style={{ padding: '1rem', margin: '0 auto', maxWidth: 1000 }}>
						<this.MapWithAMarker
							googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
							loadingElement={<div style={{ height: `100%` }} />}
							containerElement={<div style={{ height: `400px` }} />}
							mapElement={<div style={{ height: `100%` }} />}
						/>
						<br/><br/><br/>
						<Form.Item label="city">
							<Input
								type="text"
								name="city"
								value={this.state.city}
								placeholder="Enter your city name"
								readOnly
							/>
						</Form.Item>
						<Form.Item label="Area">
							<Input
								type="text"
								name="area"
								value={this.state.area}
								placeholder="Enter your Area name"
								readOnly
							/>
						</Form.Item>
						<Form.Item label="state">
							<Input
								type="text"
								name="state"
								value={this.state.state}
								placeholder="Enter your State name"
								readOnly
							/>
						</Form.Item>
						<Form.Item label="Address">
							<Input
								type="text"
								name="address"
								value={this.state.address}
								placeholder="Enter your address"
								readOnly
							/>
						</Form.Item>
					</div>
					{this.props.user.data.isVerifiedPhoneNumber === true ? (
						<Form.Item>
							<Button type="submit" onClick={this.handleSubmit}>
								Create
							</Button>
						</Form.Item>
					) : (
						<Form className="otp-form">
							<Form.Item>
								<Input
									type="tel"
									name="phoneNumber"
									onChange={this.handleChange}
									value={this.state.phoneNumber}
									placeholder="Enter phoneNumber"
									addonBefore="+91"
									required
								/>
							</Form.Item>
							<Form.Item>
								<Input
									type="tel"
									name="confirmPhoneNumber"
									onChange={this.handleChange}
									value={this.state.confirmPhoneNumber}
									placeholder="confirm your PhoneNo."
									addonBefore="+91"
									required
								/>
							</Form.Item>
							<Form.Item style={{ position: 'absolute', right: '20%' }}>
								<Button onClick={this.handleGetOTP} type="submit">
									send otp
								</Button>
							</Form.Item>

							<div className="otp">
								<Form.Item>
									<Input
										type="number"
										name="code"
										placeholder="Enter OTP"
										onChange={this.handleChange}
										value={this.state.code}
										required
									/>
								</Form.Item>
								<Form.Item>
									<Button style={{ width: '200px' }} onClick={this.handleSubmit1} type="submit">
										submit otp
									</Button>
								</Form.Item>
							</div>
						</Form>
					)}
				</Form>
			</div>
		) : (
			<Redirect to="/signIn" />
		);
	}
}

const mapStateToProps = (storeState) => {
	return { user: storeState.userState.user };
};

export default connect(mapStateToProps, { listingHouse, createOTP, verifyOTP })(ListingPage);
