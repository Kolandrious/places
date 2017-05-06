import React from 'react'
import { withGoogleMap, GoogleMap, InfoWindow, Marker } from 'react-google-maps'
import markerIcon from './primitive_marker.png'

export default withGoogleMap(props => (
  <GoogleMap
    onClick={props.onMapClick}
    defaultZoom={8}
    defaultCenter={{ lat: 51.5285578, lng: -0.142023 }}
  >
    {props.markers.map((marker, index) =>
      <Marker
        key={marker.id}
        position={marker.position}
        icon={markerIcon}
        onClick={() => { props.onPlaceClick(marker.id) }}
      >
        {marker.open && <InfoWindow><div>{marker.description}</div></InfoWindow>}
      </Marker>
    )}
    {props.initialMarker && <Marker position={props.initialMarker.position} icon={markerIcon} onClick={props.onInitialClick} >
      {props.initialMarker.open && <InfoWindow>
        <div>
          <form>
            <input
              type="text"
              value={props.initialMarker.description}
              placeholder="Type in your short event description"
              onSubmit={props.submit}
              onChange={props.onInputChange}
            />
            <button type="submit" onClick={props.submit}>save</button>
          </form>
        </div>
      </InfoWindow>}
    </Marker>
    }
  </GoogleMap>
))
