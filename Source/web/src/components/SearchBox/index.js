import React from 'react';
import Utils from 'src/common/Utils';
import { Fragment } from 'react';
import Constants from 'src/common/Constants';

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
            this.setState({
                places: [],
                onSearchBoxMounted: (ref) => {
                    // console.log(ref, 'ref inside');
                    refs.searchBox = ref;
                },

                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    let input = this.props.inputSearch;
                    let resultList = [];

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

                        input = place.formatted_address;
                        resultList = [...list.slice(0, 10)];
                        this.props.setListAcademy(resultList);
                        this.props.setShowListAcademy(false);
                        this.props.setSearched(true);
                        this.props.setTextResult(input);
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
            <input
                id="inputSearch"
                type="text"
                placeholder="Type to enter your address, town or postcode"
                value={props.inputSearch}
                onChange={(event) => {
                    props.setInputSearch(event.target.value);
                }}
            />
        </StandaloneSearchBox>
        <button
            onClick={() => {
                const inputSearch = document.getElementById('inputSearch');
                inputSearch.focus();

                const enter = new KeyboardEvent('keydown', {
                    bubbles: true,
                    cancelable: true,
                    keyCode: 13,
                });

                inputSearch.dispatchEvent(enter);
            }}>
            {props.searched ? 'FIND' : 'GO'}
        </button>
    </Fragment>
));

export default PlacesWithStandaloneSearchBox;
