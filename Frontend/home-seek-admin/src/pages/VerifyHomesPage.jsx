import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createHomes} from '../store/ownerReducer';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from 'react-google-maps';
import Geocode from 'react-geocode';
import Autocomplete from 'react-google-autocomplete';
import { Upload, Modal, Form, Input, Button, Typography, Checkbox, Descriptions, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Title } = Typography;

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.enableDebug();

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

const layout = {
	labelCol: {
		span: 5
	},
	wrapperCol: {
		span: 10
	}
};
const tailLayout = {
	wrapperCol: {
		offset: 5,
		span: 10
	}
};

class VerifyHomesPage extends Component {
	state = {
		previewVisible: false,
		previewImage: '',
		previewTitle: '',
		fileList: [],
		rent: 0,
		type: '',
		deposit: 0,
		bedrooms: 0,
		bathRooms: 0,
		sofa: false,
		tv: false,
		dish: false,
		wifi: false,
		fridge: false,
		oven: false,
		beds: false,
		noOfBeds: 0,
		listedBy: '',
		superBuiltUpArea: '',
		carpetArea: '',
		totalFloors: 0,
		floorNumber: '',
		carParking: '',
		facing: '',
		projectName: '',
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
		}
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
								//console.log(response);
								const address = response.results[0].formatted_address,
									addressArray = response.results[0].address_components,
									city = this.getCity(addressArray),
									area = this.getArea(addressArray),
									state = this.getState(addressArray);
								//console.log('city', city, area, state);
								this.setState({
									address: address ? address : '',
									area: area ? area : '',
									city: city ? city : '',
									state: state ? state : ''
								});
							},
							(error) => {
								//console.error(error);
								alert(error.message);
							}
						);
					}
				);
			});
		} else {
			//console.error('Geolocation is not supported by this browser!');
			alert('Geolocation is not supported by this browser!');
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

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.checked }, () => {
			console.log('updated state value');
		});
	};

	handleCancel = () => this.setState({ previewVisible: false });

	handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		this.setState({
			previewImage: file.url || file.preview,
			previewVisible: true,
			previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
		});
	};

	handleChange1 = ({ fileList }) => {
		console.log(fileList, 1)
		this.setState({ fileList });
    };
    
    handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        const data = {
            rent: this.state.rent,
            type: this.state.type,
            location: {
				type: "Point",
				coordinates: [this.state.mapPosition.lat, this.state.mapPosition.lng],
				city : this.state.city,
				state : this.state.state,
				formattedAddress: this.state.address
            },
            deposit: this.state.deposit,
            bedrooms: this.state.bedrooms,
            bathRooms: this.state.bathRooms,
            furnishing: {
                sofa: this.state.sofa,
                tv: this.state.tv,
                dish: this.state.dish,
                wifi: this.state.wifi,
                fridge: this.state.fridge,
                oven: this.state.oven,
                beds: this.state.beds,
                noOfBeds: this.state.noOfBeds
            },
            listedBy: this.state.listedBy,
            superBuiltUpArea: this.state.superBuiltUpArea,
            carpetArea: this.state.carpetArea,
            totalFloors: this.state.totalFloors,
            floorNumber: this.state.floorNumber,
            carParking: this.state.carParking,
            facing: this.state.facing,
            projectName: this.state.projectName,
		}

		for (const file of this.state.fileList) {
			formData.append('images', file.originFileObj)
		}
		formData.append("data", JSON.stringify(data));
		const homeId = this.props.match.params.homeId
		this.props.createHomes({homeId: homeId, data:formData})
		message.success('verified successfully!!')
    }

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
				alert(error.message);
			}
		);
	};

	onPlaceSelected = (place) => {
		//console.log('plc', place);
		const address = place.formatted_address,
			addressArray = place.address_components,
			city = this.getCity(addressArray),
			area = this.getArea(addressArray),
			state = this.getState(addressArray),
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();

		//console.log('latvalue', latValue);
		//console.log('lngValue', lngValue);

		// Set these values in the state.
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
    
    AsyncMap = withScriptjs(
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

	render() {
		const { previewVisible, previewImage, fileList, previewTitle } = this.state;
		const uploadButton = (
			<div>
				<PlusOutlined />
				<div className="ant-upload-text">Upload</div>
			</div>
		);
		return (
			<div>
				<Title>Update the house</Title>
				<div className="clearfix" style={{marginLeft: 330}}>
                    <h3>Images: </h3>
					<Upload
						listType="picture-card"
						fileList={fileList}
						onPreview={this.handlePreview}
						onChange={this.handleChange1}
						beforeUpload={() => false}
					>
						{fileList.length >= 10 ? null : uploadButton}
					</Upload>
					<Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={this.handleCancel}>
						<img alt="example" style={{ width: '100%' }} src={previewImage} />
					</Modal>
				</div>
				<div>
					<Form
						{...layout}
						name="basic"
						initialValues={{
							remember: true
						}}
					>
						<Form.Item
							label="Rent"
							name="rent"
							rules={[
								{
									required: true,
									message: 'Please input your rent!'
								}
							]}
						>
							<Input name="rent" type="number" onChange={this.handleChange} value={this.state.rent} />
						</Form.Item>

						<Form.Item
							label="Type"
							name="type"
							rules={[
								{
									required: true,
									message: 'Please input your type!'
								}
							]}
						>
							<Input name="type" onChange={this.handleChange} value={this.state.type} />
						</Form.Item>

						<div style={{ padding: '1rem', margin: '0 auto', maxWidth: 1000 }}>
							<h5>Location:</h5>
							<Descriptions bordered>
								<Descriptions.Item label="City">{this.state.city}</Descriptions.Item>
								<Descriptions.Item label="Area">{this.state.area}</Descriptions.Item>
								<Descriptions.Item label="State">{this.state.state}</Descriptions.Item>
								<Descriptions.Item label="Address">{this.state.address}</Descriptions.Item>
							</Descriptions>

							<this.AsyncMap
								googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env
									.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
								loadingElement={<div style={{ height: `100%` }} />}
								containerElement={<div style={{ height: this.state.height }} />}
								mapElement={<div style={{ height: `100%` }} />}
							/>
						</div>
						<br />
						<br />
						<br />
						<Form.Item
							label="Deposit"
							name="deposit"
							rules={[
								{
									required: true,
									message: 'Please input your deposit!'
								}
							]}
						>
							<Input name="deposit" type="number" onChange={this.handleChange} value={this.state.deposit} />
						</Form.Item>

						<Form.Item
							label="BedRooms"
							name="bedrooms"
							rules={[
								{
									required: true,
									message: 'Please input your bedrooms!'
								}
							]}
						>
							<Input name="bedrooms" type="number" onChange={this.handleChange} value={this.state.bedrooms} />
						</Form.Item>

						<Form.Item
							label="BathRooms"
							name="bathRooms"
							rules={[
								{
									required: true,
									message: 'Please input your bathRooms!'
								}
							]}
						>
							<Input name="bathRooms" type="number" onChange={this.handleChange} value={this.state.bathRooms} />
						</Form.Item>
						<div style={{ marginLeft: 320, marginBottom: 20 }}>
							<h5>Furnishing</h5>
							<Checkbox onChange={this.onChange} name="sofa" checked={this.state.sofa}>
								Sofa
							</Checkbox>
							<Checkbox onChange={this.onChange} name="tv" checked={this.state.tv}>
								TV
							</Checkbox>
							<Checkbox onChange={this.onChange} name="dish" checked={this.state.dish}>
								Dish
							</Checkbox>
							<Checkbox onChange={this.onChange} name="wifi" checked={this.state.wifi}>
								WIFI
							</Checkbox>
							<Checkbox onChange={this.onChange} name="fridge" checked={this.state.fridge}>
								Refrigerators
							</Checkbox>
							<Checkbox onChange={this.onChange} name="oven" checked={this.state.oven}>
								Oven
							</Checkbox>
							<Checkbox onChange={this.onChange} name="beds" checked={this.state.beds}>
								Beds
							</Checkbox>
						</div>
                        <Form.Item
							label="NoOfBeds"
							name="noOfBeds"
							rules={[
								{
									required: true,
									message: 'Please input your noOfBeds!'
								}
							]}
						>
							<Input name="noOfBeds" type="number" onChange={this.handleChange} value={this.state.noOfBeds} />
						</Form.Item>

						<Form.Item
							label="ListedBy"
							name="listedBy"
							rules={[
								{
									required: true,
									message: 'Please input your listedBy!'
								}
							]}
						>
							<Input name="listedBy" onChange={this.handleChange} value={this.state.listedBy} />
						</Form.Item>

						<Form.Item
							label="SuperBuiltUpArea"
							name="superBuiltUpArea"
							rules={[
								{
									required: true,
									message: 'Please input your superBuiltUpArea!'
								}
							]}
						>
							<Input
								name="superBuiltUpArea"
								onChange={this.handleChange}
								value={this.state.superBuiltUpArea}
							/>
						</Form.Item>

						<Form.Item
							label="CarpetArea"
							name="carpetArea"
							rules={[
								{
									required: true,
									message: 'Please input your carpetArea!'
								}
							]}
						>
							<Input name="carpetArea" onChange={this.handleChange} value={this.state.carpetArea} />
						</Form.Item>

						<Form.Item
							label="TotalFloors"
							name="totalFloors"
							rules={[
								{
									required: true,
									message: 'Please input your totalFloors!'
								}
							]}
						>
							<Input
								name="totalFloors"
								type="number"
								onChange={this.handleChange}
								value={this.state.totalFloors}
							/>
						</Form.Item>

						<Form.Item
							label="FloorNumber"
							name="floorNumber"
							rules={[
								{
									required: true,
									message: 'Please input your floorNumber!'
								}
							]}
						>
							<Input name="floorNumber" onChange={this.handleChange} value={this.state.floorNumber} />
						</Form.Item>

						<Form.Item
							label="CarParking"
							name="carParking"
							rules={[
								{
									required: true,
									message: 'Please input your carParking!'
								}
							]}
						>
							<Input name="carParking" onChange={this.handleChange} value={this.state.carParking} />
						</Form.Item>

						<Form.Item
							label="Facing"
							name="facing"
							rules={[
								{
									required: true,
									message: 'Please input your facing!'
								}
							]}
						>
							<Input name="facing" onChange={this.handleChange} value={this.state.facing} />
						</Form.Item>

						<Form.Item
							label="ProjectName"
							name="projectName"
							rules={[
								{
									required: true,
									message: 'Please input your projectName!'
								}
							]}
						>
							<Input name="projectName" onChange={this.handleChange} value={this.state.projectName} />
						</Form.Item>

						<Form.Item {...tailLayout}>
							<Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
								Submit
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (storeState) => {
	return {
		admin: storeState.features.admin.admin,
		homes: storeState.features.ownerHomes.homes
	};
};

export default connect(mapStateToProps, { createHomes })(VerifyHomesPage);
