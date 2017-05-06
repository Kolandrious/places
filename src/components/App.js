import React, { Component } from 'react';
import PlacesMap from './PlacesMap'
import '../App.css';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      places: [
        {
          id: 0,
          description: 'wussup',
          position: { lat: 51.465772, lng: -0.164795 },
          open: false,
        },
      ],
      // initialMarker: {
      //   description: 'initial',
      //   position: {},
      //   open: true
      // },
    }

    this.counter = 1
  }

  handleMapCLick = event => {
    const newMarker = { description: '', position: event.latLng, open: true }
    this.setState({ initialMarker: newMarker })
  }

  handleSave = event => {
    console.log(this.state.initialMarker)
    event.preventDefault()
    this.setState({
      places: [
        ...this.state.places,
        { ...this.state.initialMarker, id: this.counter++ },
      ],
      initialMarker: null,
    })
  }

  handleDescriptionChange = event => {
    this.setState({
      initialMarker: { ...this.state.initialMarker, description: event.target.value },
    })
  }

  toggleInfoWindow = (id) => {
    this.setState(state => {
      const places = [...state.places]
      places[id] = { ...places[id], open: !places[id].open }
      return { places }
    })
  }

  toggleInitialMarkerInfoWindow = () => {
    this.setState(state => ({ initialMarker: { ...state.initialMarker, open: !state.initialMarker.open } }
    ))
  }

  render() {
    return (
      <div className="App">
        <PlacesMap
          containerElement={<div style={{ height: '100%', width: '100%' }} />}
          mapElement={<div style={{ height: '501px', width: '100%' }} />}
          onMapClick={this.handleMapCLick}
          markers={this.state.places}
          submit={this.handleSave}
          onInputChange={this.handleDescriptionChange}
          onPlaceClick={this.toggleInfoWindow}
          initialMarker={this.state.initialMarker}
          onInitialClick={this.toggleInitialMarkerInfoWindow}
        />
        <h1 style={{ textAlign: 'center' }} >Places</h1>
      </div>
    );
  }
}
