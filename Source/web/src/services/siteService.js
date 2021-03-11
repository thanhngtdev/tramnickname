import { APIConfig } from 'requests/ApiConfig';
import httpMethod from './httpMethod';

class SiteService {
    getHome() {
        return httpMethod.get(APIConfig.URL_GET_HOME);
    }

    getDetailSite({ siteId, cate }) {
        return httpMethod.get(
            `${APIConfig.GET_DETAIL_SITE}?siteId=${siteId}&cate=${cate}`,
        );
    }

    getListSite() {
        return httpMethod.get(APIConfig.URL_GET_LIST_SITE);
    }

    getFranchiseDetail({ id }) {
        return httpMethod.get(
            `${APIConfig.GET_DETAIL_SITE}?siteId=${id}&cate=`,
        );
    }
}

export default new SiteService();
