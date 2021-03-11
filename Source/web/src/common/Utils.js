/* eslint-disable class-methods-use-this */
import { STORAGE_URL } from '../requests/ApiConfig';
import packageVersion from '../../package.json';
import { siteActionType } from 'redux/actions/actionTypes';

const { hasOwnProperty } = Object.prototype;
class Utils {
    getThumb(_alias, crop) {
        if (!_alias) return null;
        let alias = _alias;
        if (!alias.startsWith('http')) {
            if (alias.startsWith('/')) {
                alias = alias.substring(1);
            }
            alias = STORAGE_URL + alias;
        }
        let realUrl = alias;
        if (crop && crop !== '') {
            const pos = alias.lastIndexOf('/');
            let baseUrl = alias.substring(0, pos);
            if (baseUrl.slice(-1) === '/') {
                baseUrl += crop;
            } else {
                baseUrl = `${baseUrl}/${crop}`;
            }
            realUrl = `${baseUrl}${alias.substring(pos)}`;
        }
        return realUrl;
    }

    checkEmail(email) {
        const emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailCheck.test(String(email).toLowerCase());
    }

    checkPhone(phone) {
        const phoneCheck = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
        return phoneCheck.test(String(phone).toLowerCase());
    }

    isEmpty(obj) {
        // null and undefined are "empty"
        if (obj == null) {
            return true;
        }

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0) {
            return false;
        }
        if (obj.length === 0) {
            return true;
        }

        // If it isn't an object at this point
        // it is empty, but it can't be anything *but* empty
        // Is it empty?  Depends on your application.
        if (typeof obj !== 'object') {
            return true;
        }

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (const key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                return false;
            }
        }

        return true;
    }
    rad(x) {
        return (x * Math.PI) / 180;
    }

    getDistance(p1, p2) {
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = this.rad(p2.lat - p1.lat);
        var dLong = this.rad(p2.lng - p1.lng);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.rad(p1.lat)) *
                Math.cos(this.rad(p2.lat)) *
                Math.sin(dLong / 2) *
                Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d; // returns the distance in meter
    }
    showDistance(x) {
        return Math.round(10 * x) / 10;
    }

    getAcademyDistance(academy, defaultLocation = {}, unit = 'm') {
        let distance = 0;
        let currentLat = localStorage.getItem('latitude');
        let currentLng = localStorage.getItem('longitude');
        if (defaultLocation.lat && defaultLocation.lng) {
            currentLat = defaultLocation.lat;
            currentLng = defaultLocation.lng;
        }
        if (
            currentLat &&
            currentLng &&
            academy.ms_latitude &&
            academy.ms_longitude
        ) {
            let currentLocation = {
                lat: currentLat,
                lng: currentLng,
            };
            let academyLocation = {
                lat: academy.ms_latitude,
                lng: academy.ms_longitude,
            };
            distance = this.getDistance(currentLocation, academyLocation);
            if (unit === 'mile') {
                distance = this.showDistance(distance * 0.000621);
            } else distance = Math.round(distance);
        }
        return distance;
    }

    getVersion() {
        return packageVersion.version;
    }
    getCurrentAcademy(dispatch, number) {
        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };
        const success = (pos) => {
            let crd = pos.coords;
            dispatch({
                type: siteActionType.GET_CURRENT_ACADEMY,
                lat: crd.latitude,
                long: crd.longitude,
                number: number,
            });
        };
        function error(err) {
            console.log('get location error');
            dispatch({
                type: siteActionType.GET_CURRENT_ACADEMY_FAILED,
                number: number,
            });
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    getMyLocation() {
        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (response) => resolve(response),
                (error) => reject(error),
                options,
            );
        });
    }

    linkToPolicy(dispatch, index) {
        dispatch({
            type: siteActionType.GET_POLICY_INDEX,
            index: index,
        });
    }
}

export default new Utils();
