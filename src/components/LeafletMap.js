import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIcon from './002-location-pointer.png'
import * as L from 'leaflet'

export default props => {
  const icon = L.icon({
    iconUrl: markerIcon,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  })

  return (
    <div>
      <Map
        center={[51.5285578, -0.142023]}
        zoom={10}
        style={{ height: '500px', cursor: 'default' }}
        onClick={(e) => { props.onMapClick(e) }}
      >
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        { props.places.map(place => (
          <Marker key={place.key} position={place.position} title={place.description} icon={icon}>
            <Popup><div>{place.description}</div></Popup>
          </Marker>
        ))}
        { props.initialMarker.position &&
          <Marker
            position={props.initialMarker.position}
            icon={icon}
            onClick={props.onInitialClick}
          >
            <Popup>
              <div id="input">
                <input
                  type="text"
                  value={props.initialMarker.description}
                  placeholder="short event description"
                  onChange={props.onInput}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      props.submit(e)
                    }
                  }}
                />
                <button onClick={props.submit} >Save!</button>
              </div>
            </Popup>
          </Marker>
        }
      </Map>
    </div>
  )
}
/*


<div>
  <input
    type="text"
    value={place.description}
    placeholder="Type in your short event description"
    onSubmit={props.submit}
    onChange={props.onInput}
  />
  <button type="submit" onClick={props.submit}>save</button>
</div>


*/
