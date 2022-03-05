// this file is to get the lat/long (location) of the user so we can tailor the results for coffee shops around their area after they click the find nearby shops button
import { useState, useContext } from 'react';
import { ACTION_TYPES, StoreContext } from '../store/store-context';

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState('');
  // const [latLong, setLatLong] = useState('');
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const { dispatch } = useContext(StoreContext);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // setLatLong(`${latitude},${longitude}`);
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { latLong: `${latitude},${longitude}` },
    });
    setLocationErrorMsg('');
    setIsFindingLocation(false);
  };

  const error = () => {
    setIsFindingLocation(false);
    setLocationErrorMsg('Unable to retrieve your location');
  };

  const handleTrackLocation = () => {
    // we will call this function inside the handleOnBannerBtnClick function. this will trigger the functionality to ask the user to give us their location and then retrieve their lat and long.
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg('Geolocation is not supported by your browser');
      setIsFindingLocation(false);
    } else {
      // status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    // latLong,
    handleTrackLocation,
    locationErrorMsg,
    isFindingLocation,
  };
};

export default useTrackLocation;
