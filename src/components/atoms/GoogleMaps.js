import { LocationMarkerIcon } from '@heroicons/react/solid';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import axios from 'axios';
import { React, useCallback, useEffect, useState } from 'react';
import Loading from './Loading';

const GoogleMaps = ({
  popup,
  sendAddress,
  sendlongLat,
  showButton = true,
  className,
  height = '55%',
}) => {
  const [didMount, setDidMount] = useState(false);
  const [selected, setSelected] = useState(null);
  const [longLat, setlongLat] = useState(null);
  const [address, setAddress] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_PINS_MAPS,
  });

  const containerStyle = {
    width: '100%',
    height: height,
  };

  const center = {
    lat: -6.2302258,
    lng: 106.8160106,
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: false,
  };

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.setZoom(16);
    map.setCenter(bounds.getCenter());
    let listener = window.google.maps.event.addListener(
      map,
      'idle',
      function () {
        if (map.getZoom() > 16) map.setZoom(16);
        window.google.maps.event.removeListener(listener);
      },
    );
  }, []);

  const reverseGeo = (lat, lng) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat}, ${lng}&sensor=true&key=${process.env.REACT_APP_PINS_MAPS}`,
      )
      .then((res) => {
        let resAddress = res.data.results[0].formatted_address;
        setAddress(resAddress);
        sendAddress(resAddress);
      })
      .catch((err) => console.log(err));
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let localCoord = position.coords;
        let objLocalCoord = {
          lat: localCoord.latitude,
          lng: localCoord.longitude,
        };
        reverseGeo(objLocalCoord.lat, objLocalCoord.lng);
        setlongLat(objLocalCoord);
        sendlongLat(objLocalCoord);
      });
    } else {
      alert('Geolocation is not supported by this browser');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getLocation();
    }, 500);
    setDidMount(true);
    return () => setDidMount(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <>
      {showButton && (
        <button
          className="absolute bg-white rounded-lg shadow-md z-10 right-8 transition-all duration-500"
          style={{ top: `${popup ? '44%' : '11%'}` }}
          onClick={getLocation}>
          <LocationMarkerIcon className="h-9 w-9 p-1 text-red-600" />
        </button>
      )}
      <div
        className={[
          className
            ? className
            : 'absolute h-screen top-0 inset-x-0 transition-all duration-300 ease-in-out',
        ].join(' ')}>
        {isLoaded && didMount ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={longLat ? longLat : center}
            zoom={16}
            onLoad={onLoad}
            options={options}>
            {/* Child components, such as markers, info windows, etc. */}
            <Marker
              position={longLat}
              onClick={() => {
                setSelected(longLat);
              }}
            />

            {selected ? (
              <InfoWindow
                position={longLat}
                onCloseClick={() => {
                  setSelected(null);
                }}>
                <div className="p-2 text-gray-800 font-medium">
                  <h2>{address}</h2>
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>
        ) : (
          <div className="flex justify-center items-center p-4">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
};

export default GoogleMaps;
