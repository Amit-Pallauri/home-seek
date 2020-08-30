import React, { Component } from 'react';
import { connect } from 'react-redux';
import { particularHome,updateHomes } from '../store/ownerReducer';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from 'react-google-maps';
import Geocode from 'react-geocode';
import Autocomplete from 'react-google-autocomplete';
import { Upload, Modal, Input, Button, Typography, Checkbox, Descriptions } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import '../styles/loading.css'

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


class UpdateHome extends Component {
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
	async componentDidMount() {
		if (this.props.match.params.homeId === undefined) {
			return 'hee';
		}
		await this.props.particularHome(this.props.match.params.homeId);
		this.setState({ rent: this.props.home.particuarPost.details.rent });

		this.setState({ type: this.props.home.particuarPost.details.type });

		this.setState({ deposit: this.props.home.particuarPost.details.deposit });

		this.setState({ bedrooms: this.props.home.particuarPost.details.bedrooms });

		this.setState({ bathRooms: this.props.home.particuarPost.details.bathRooms });

		this.setState({ sofa: this.props.home.particuarPost.details.furnishing.sofa });

		this.setState({ tv: this.props.home.particuarPost.details.furnishing.tv });

		this.setState({ dish: this.props.home.particuarPost.details.furnishing.dish });

		this.setState({ wifi: this.props.home.particuarPost.details.furnishing.wifi });

		this.setState({ fridge: this.props.home.particuarPost.details.furnishing.fridge });

		this.setState({ oven: this.props.home.particuarPost.details.furnishing.oven });

		this.setState({ beds: this.props.home.particuarPost.details.furnishing.beds });

		this.setState({ noOfBeds: this.props.home.particuarPost.details.furnishing.noOfBeds });

		this.setState({ listedBy: this.props.home.particuarPost.details.listedBy });

		this.setState({ superBuiltUpArea: this.props.home.particuarPost.details.superBuiltUpArea });

		this.setState({ carpetArea: this.props.home.particuarPost.details.carpetArea });

		this.setState({ totalFloors: this.props.home.particuarPost.details.totalFloors });

		this.setState({ floorNumber: this.props.home.particuarPost.details.floorNumber });

		this.setState({ carParking: this.props.home.particuarPost.details.carParking });

		this.setState({ facing: this.props.home.particuarPost.details.facing });

		this.setState({ projectName: this.props.home.particuarPost.details.projectName });

		this.setState({ address: this.props.home.particuarPost.details.location.formattedAddress });

		this.setState({
			mapPosition: {
				lat: this.props.home.particuarPost.details.location.coordinates[0],
				lng: this.props.home.particuarPost.details.location.coordinates[1]
			}
		});

		this.setState({
			markerPosition: {
				lat: this.props.home.particuarPost.details.location.coordinates[0],
				lng: this.props.home.particuarPost.details.location.coordinates[1]
			}
		});

        for (let index = 0; index < this.props.home.particuarPost.details.images.length; index++) {
            this.setState({ fileList: [ ...this.state.fileList, {uid: uuidv4(),url : this.props.home.particuarPost.details.images[index]} ] });
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
		console.log(fileList, 1);
		this.setState({ fileList });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		const data = {
			rent: this.state.rent,
			type: this.state.type,
			location: {
				type: 'Point',
				coordinates: [ this.state.mapPosition.lat, this.state.mapPosition.lng ],
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
			projectName: this.state.projectName
		};

		for (const file of this.state.fileList) {
			formData.append('images', file.originFileObj);
		}
		formData.append('data', JSON.stringify(data));
		const homeId = this.props.match.params.homeId;
		this.props.updateHomes({ homeId: homeId, data: formData });
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
				{!this.props.home ? (
					<div className="container">
						<div className="box" />
					</div>
				) : (
					<div>
						<Title>Update the house</Title>
						<div className="clearfix" style={{ marginLeft: 330 }}>
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
							<Modal
								visible={previewVisible}
								title={previewTitle}
								footer={null}
								onCancel={this.handleCancel}
							>
								<img alt="example" style={{ width: '100%' }} src={previewImage} />
							</Modal>
						</div>
						<div style={{ width: 1000, marginLeft: 220, marginBottom: 20 }}>
							<label htmlFor="rent">rent</label>
							<Input
								required
								name="rent"
								type="number"
								onChange={this.handleChange}
								value={this.state.rent}
							/>
							<br />
							<br />

							<label htmlFor="type">type</label>
							<Input
								required
								name="type"
								type="text"
								onChange={this.handleChange}
								value={this.state.type}
							/>
							<br />
							<br />

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
							<label htmlFor="deposit">deposit</label>

							<Input
								required
								name="deposit"
								type="number"
								onChange={this.handleChange}
								value={this.state.deposit}
							/>
							<br />
							<br />

							<label htmlFor="bedRooms">bedRooms</label>

							<Input
								required
								name="bedrooms"
								type="number"
								onChange={this.handleChange}
								value={this.state.bedrooms}
							/>
							<br />
							<br />

							<label htmlFor="bathRooms">bathRooms</label>

							<Input
								required
								name="bathRooms"
								type="number"
								onChange={this.handleChange}
								value={this.state.bathRooms}
							/>
							<br />
							<br />

							<div style={{ marginLeft: 0, marginBottom: 20 }}>
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
							<br />
							<br />

							<label htmlFor="noOfBeds">noOfBeds</label>

							<Input
								required
								name="noOfBeds"
								type="number"
								onChange={this.handleChange}
								value={this.state.noOfBeds}
							/>
							<br />
							<br />

							<label htmlFor="listedBy">listedBy</label>

							<Input required name="listedBy" onChange={this.handleChange} value={this.state.listedBy} />
							<br />
							<br />

							<label htmlFor="superBuiltUpArea">superBuiltUpArea</label>

							<Input
								required
								name="superBuiltUpArea"
								onChange={this.handleChange}
								value={this.state.superBuiltUpArea}
							/>
							<br />
							<br />

							<label htmlFor="carpetArea">carpetArea</label>

							<Input
								required
								name="carpetArea"
								onChange={this.handleChange}
								value={this.state.carpetArea}
							/>
							<br />
							<br />

							<label htmlFor="totalFloors">totalFloors</label>

							<Input
								required
								name="totalFloors"
								type="number"
								onChange={this.handleChange}
								value={this.state.totalFloors}
							/>
							<br />
							<br />

							<label htmlFor="floorNumber">floorNumber</label>

							<Input
								required
								name="floorNumber"
								onChange={this.handleChange}
								value={this.state.floorNumber}
							/>
							<br />
							<br />

							<label htmlFor="carParking">carParking</label>

							<Input
								required
								name="carParking"
								onChange={this.handleChange}
								value={this.state.carParking}
							/>
							<br />
							<br />

							<label htmlFor="facing">facing</label>

							<Input required name="facing" onChange={this.handleChange} value={this.state.facing} />
							<br />
							<br />
							<label htmlFor="projectName">projectName</label>

							<Input
								required
								name="projectName"
								onChange={this.handleChange}
								value={this.state.projectName}
							/>
							<br />
							<br />
							<Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
								Submit
							</Button>
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (storeState) => {
	return {
		admin: storeState.features.admin.admin,
		home: storeState.features.ownerHomes.particularHome
	};
};

export default connect(mapStateToProps, { particularHome, updateHomes })(UpdateHome);
