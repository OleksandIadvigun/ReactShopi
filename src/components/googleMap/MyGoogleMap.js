import {GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps";

export default function MyGoogleMap() {
    const Map =()=>{
        return <GoogleMap defaultZoom={10} defaultCenter={{lat:50.450100,lng:30.523399}}/>
    }
   const  WrappedMap = withScriptjs(withGoogleMap(Map));
  return (
    <div>
        <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
            // &key=${
            //     process.env.REACT_APP_GOOGLE_KEY
            // }`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    </div>
  );
}
