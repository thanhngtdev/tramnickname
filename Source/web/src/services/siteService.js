import Utils from 'src/common/Utils';
import httpMethod from './httpMethod';
import { APIConfig, PARENT_API } from '../requests/ApiConfig';
import httpMethodPA from './httpMethodPA';

class SiteService {
    getHome() {
        return httpMethod.get(APIConfig.URL_GET_HOME);
    }

    getPolicy() {
        return httpMethod.get(APIConfig.GET_POLICY);
    }

    getDetailSite({ id, cate = '', location = '', slug = '' }) {
        if (!id) {
            return httpMethod.get(
                `${APIConfig.GET_DETAIL_SITE}${Utils.convertToQuery({
                    slug: slug,
                })}`,
            );
        }

        return httpMethod.get(
            `${APIConfig.GET_DETAIL_SITE}${Utils.convertToQuery({
                siteId: id,
                cate: cate,
                location: location,
                slug: slug,
            })}`,
        );
    }

    getAbout() {
        return httpMethod.get(APIConfig.GET_ABOUT);
    }

    getListSite() {
        // return httpMethod.get(APIConfig.URL_GET_LIST_SITE);
        return httpMethod.get(`${APIConfig.URL_GET_LIST_SITE}?schedule=1`);
    }

    getFranchiseDetail({ id, isSubpage = false, subPage = '', slug = '' }) {
        if (isSubpage) {
            return httpMethod.get(
                `${APIConfig.GET_DETAIL_SITE}${Utils.convertToQuery({
                    siteId: id,
                    slug: slug,
                    subpage: subPage,
                })}`,
            );
        }

        return httpMethod.get(
            `${APIConfig.GET_DETAIL_SITE}${Utils.convertToQuery({
                siteId: id,
                slug: slug,
            })}`,
        );
    }

    getListNews({ cate = '', page, alias = '' }) {
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

    checkEmail(body) {
        return httpMethod.post(
            `${PARENT_API}api/v2/email-check
        `,
            body,
        );
    }

    getTrustPilot() {
        return httpMethod.get(
            `${APIConfig.TRUST_PILOT}?cfg[0]=truspilot_rating&cfg[1]=trustpilot_max_rate&cfg[2]=trustpilot_reviews`,
        );
    }

    searchArticle(param) {
        return httpMethod.post(`${APIConfig.URL_SEARCH}`, param);
    }

    searchFAQ(cate = '') {
        return httpMethod.get(
            `${APIConfig.GET_LIST_FAQ}${Utils.convertToQuery({
                cate: cate,
            })}`,
        );
    }

    // getStatusPaymentPA(param) {
    //     return httpMethodPA.get(`${APIConfig.GET_STATUS_PAYMENT + param}}`);
    // }
}

export default new SiteService();
