import Constants from './Constants';

const userInfoInitial = {
    serverId: 0,
    prodUrl: '',
    stagingUrl: '',
    visitSiteLink: '',
    contactLink: '',
    langId: 0,
    isoCode: '',
    localName: '',
    langDefault: 0,
    countryCode: '',
    countryLocalName: '',
    countryIsoCode: '',
    widlcardCountry: 0,
    searchType: '',
    vehicleColumn: [],
    filterVehicle: {},
    compareData: [],
    wishList: [],
    searchHistory: [],
};
class ModelManager {
    getLocation() {
        return JSON.parse(localStorage.getItem('defaultAcademy')) || {};
    }
}

export default new ModelManager();
