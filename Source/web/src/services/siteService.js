import Utils from 'src/common/Utils';
import httpMethod from './httpMethod';
import { APIConfig } from '../requests/ApiConfig';

class SiteService {
    getHome() {
        return httpMethod.get(APIConfig.URL_GET_HOME);
    }

    getPolicy() {
        return httpMethod.get(APIConfig.GET_POLICY);
    }

    getDetailSite({ id, cate }) {
        return httpMethod.get(
            `${APIConfig.GET_DETAIL_SITE}${Utils.convertToQuery({
                siteId: id,
                cate: cate,
            })}`,
        );
    }

    getAbout() {
        return httpMethod.get(APIConfig.GET_ABOUT);
    }

    getListSite() {
        return httpMethod.get(APIConfig.URL_GET_LIST_SITE);
    }

    getFranchiseDetail({ id }) {
        return httpMethod.get(
            `${APIConfig.GET_DETAIL_SITE}${Utils.convertToQuery({
                siteId: id,
            })}`,
        );
    }

    getListNews({ cate, page, alias }) {
        return httpMethod.get(
            `${APIConfig.GET_LIST_NEWS}${Utils.convertToQuery({
                cate: cate,
                page: page,
                alias: alias,
            })}`,
        );
    }

    getDetailNews({ id }) {
        return httpMethod.get(
            `${APIConfig.DETAIL_ARTICLE}${Utils.convertToQuery({
                atcId: id,
            })}`,
        );
    }

    sendForm({ param }) {
        return httpMethod.post(`${APIConfig.SEND_FORM}`, param);
    }

    sendEmail({ param }) {
        return httpMethod.post(APIConfig.SEND_EMAIL, param);
    }

    getFAQ() {
        return httpMethod.get(APIConfig.GET_LIST_FAQ);
    }

    getFooterConfig() {
        return httpMethod.get(APIConfig.GET_FOOTER_CONFIG);
    }

    getListCourse({ company_id, location_id = '', course_type }) {
        return httpMethod.get(
            `${APIConfig.GET_LIST_COURSE}${Utils.convertToQuery({
                company_id: company_id,
                location_id: location_id,
                type: course_type,
            })}`,
        );
    }
}

export default new SiteService();
