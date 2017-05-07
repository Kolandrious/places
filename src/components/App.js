import React, { Component } from 'react';
import firebase from 'firebase'
// import PlacesMap from './PlacesMap'
import 'leaflet/dist/leaflet.css'
import LeafletMap from './LeafletMap'
import '../App.css';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authenticated: false,
      places: [
      ],
      initialMarker: {},
    }
  }

  handleMapCLick = event => {
    const newMarker = { description: '', position: event.latlng }
    this.setState(() => ({ initialMarker: newMarker }))
  }

  handleSave = (e) => {
    e.preventDefault();
    console.log('save')
    const timePlacedAt = new Date().toISOString()
    firebase.database().ref(`global`).push({
      ...this.state.initialMarker,
      timePlacedAt: firebase.database.ServerValue.TIMESTAMP,
    })
    .then(() => {
      this.setState(state => ({
        initialMarker: {},
      }))
    })
    .catch(error => { console.log(error) })
  }

  handleDescriptionChange = event => {
    this.setState({
      initialMarker: { ...this.state.initialMarker, description: event.target.value },
    })
  }


  componentDidMount() {
    firebase.database().ref(`global`).on('value', (data) => {
      const places = Object.values(data.val()).map((place, index) => ({
        ...place,
        key: Object.keys(data.val())[index],
      }))
      console.log(places)
      this.setState(state => ({ places }))
    })
  }

  render() {
    return (
      <div className="App">
        <LeafletMap
          onMapClick={this.handleMapCLick}
          submit={this.handleSave}
          onInput={this.handleDescriptionChange}
          places={this.state.places}
          initialMarker={this.state.initialMarker}
        />
        <h1 style={{ textAlign: 'center' }} >Places</h1>
      </div>
    );
  }
}
