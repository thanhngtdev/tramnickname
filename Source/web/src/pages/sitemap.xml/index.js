import { getServerSideSitemap } from 'next-sitemap';
import Utils from 'src/common/Utils';
import siteService from 'src/services/siteService';

export const getServerSideProps = async (ctx) => {
    // Method to source urls from cms
    const listRes = await siteService.getListSite();
    const listSite = listRes.data.data.lstSite;
    const urls = Utils.getAllUrl(listSite);
    return getServerSideSitemap(ctx, urls);
};

// Default export to prevent next.js errors
export default () => {};
