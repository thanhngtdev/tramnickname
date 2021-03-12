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

    getListNews({ cate, page, alias }) {
        return httpMethod.get(
            `${APIConfig.GET_LIST_NEWS}?cate=${cate}&page=${page}&alias=${alias}`,
        );
    }

    getDetailNews({ id }) {
        return httpMethod.get(`${APIConfig.DETAIL_ARTICLE}?atcId=${id}`);
    }
}

export default new SiteService();
