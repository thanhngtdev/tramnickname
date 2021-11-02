import React, { Fragment } from 'react';
import Constants from 'src/common/Constants';
import Utils from 'src/common/Utils';

const { compose, withProps, lifecycle } = require('recompose');
const { withScriptjs } = require('react-google-maps');
const {
    StandaloneSearchBox,
} = require('react-google-maps/lib/components/places/StandaloneSearchBox');

const PlacesWithStandaloneSearchBox = compose(
    withProps({
        // googleMapURL:
        //     'https://maps.googleapis.com/maps/api/js?key=AIzaSyCkHEoNpHbkdGlYwWFA8JaIOF_o-Y9B4d4&v=3.exp&libraries=geometry,drawing,places',
        googleMapURL: Constants.GOOGLE_MAP_URL,

        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {};
            // const dispatch = useDispatch();
            this.setState({
                places: [],
                onSearchBoxMounted: (ref) => {
                    refs.searchBox = ref;
                },

                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();

                    // console.log(places, 'places');

                    if (places.length > 0) {
                        const place = places[0];
                        // console.log(place, 'place');
                        const lat = place.geometry.location.lat();
                        const long = place.geometry.location.lng();
                        const list = [...this.props.listSite].filter(
                            (item) =>
                                (item.distance =
                                    Utils.getDistanceFromLatLonInKm(
                                        lat,
                                        long,
                                        item.ms_latitude,
                                        item.ms_longitude,
                                    )),
                        );

                        list.sort((a, b) => a.distance - b.distance);

                        this.props.setFilteredSuggestions(list);
                        this.props.setUserInput(place.formatted_address);
                    }
                },
            });
        },
    }),
    withScriptjs,
)((props) => (
    <Fragment>
        <StandaloneSearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            onPlacesChanged={props.onPlacesChanged}>
            <div className="text-input">
                <input
                    id="inputSearch"
                    type="text"
                    value={props.userInput}
                    placeholder="Enter Postcode, Address,..."
                    onChange={(event) => {
                        props.setUserInput(event.target.value);
                        props.setShowSuggestions(false);
                    }}
                    onClick={(event) => {
                        props.setShowSuggestions(false);
                    }}
                />

                <svg
                    onClick={props.setCurrentLocation}
                    width="18px"
                    height="20px"
                    viewBox="0 0 18 20"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg">
                    <g
                        id="Page-1"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd">
                        <g
                            id=""
                            transform="translate(-534.000000, -294.000000)"
                            fill="#000000"
                            fillRule="nonzero">
                            <g
                                id="search"
                                transform="translate(165.000000, 221.000000)">
                                <g
                                    id="map-pin-alt"
                                    transform="translate(369.000000, 73.000000)">
                                    <path
                                        d="M8,9.9 L8,15 C8,15.5522847 8.44771525,16 9,16 C9.55228475,16 10,15.5522847 10,15 L10,9.9 C12.5149632,9.38663528 14.2326695,7.05230129 13.9746808,4.4984757 C13.716692,1.94465012 11.5668236,0.00102051443 9,0.00102051443 C6.43317641,0.00102051443 4.28330801,1.94465012 4.02531923,4.4984757 C3.76733046,7.05230129 5.48503678,9.38663528 8,9.9 Z M9,2 C10.6568542,2 12,3.34314575 12,5 C12,6.65685425 10.6568542,8 9,8 C7.34314575,8 6,6.65685425 6,5 C6,3.34314575 7.34314575,2 9,2 Z M13.21,12.42 C12.8527344,12.3449742 12.4825816,12.4662465 12.2389746,12.7381346 C11.9953675,13.0100228 11.915316,13.3912207 12.0289746,13.7381347 C12.1426331,14.0850486 12.4327344,14.3449742 12.79,14.42 C15.06,14.87 16,15.68 16,16 C16,16.58 13.55,18 9,18 C4.45,18 2,16.58 2,16 C2,15.68 2.94,14.87 5.21,14.38 C5.56726559,14.3049742 5.85736685,14.0450486 5.97102542,13.6981347 C6.08468399,13.3512207 6.00463244,12.9700228 5.76102542,12.6981347 C5.51741839,12.4262465 5.14726559,12.3049742 4.79,12.38 C1.75,13.08 0,14.39 0,16 C0,18.63 4.53,20 9,20 C13.47,20 18,18.63 18,16 C18,14.39 16.25,13.08 13.21,12.42 Z"
                                        id="Shape"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
        </StandaloneSearchBox>
        <button
            // className="btn-pin"
            onClick={() => {
                // props.setIsSearch(true);
                const inputSearch = document.getElementById('inputSearch');
                inputSearch.focus();
                const enter = new KeyboardEvent('keydown', {
                    bubbles: true,
                    cancelable: true,
                    keyCode: 13,
                });
                inputSearch.dispatchEvent(enter);
            }}>
            FIND
        </button>
    </Fragment>
));

export default PlacesWithStandaloneSearchBox;
