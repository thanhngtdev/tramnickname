import React, { useEffect } from 'react';
import saveList from 'src/hooks/useSaveList';
import dynamic from 'next/dynamic';
const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));
import siteService from 'src/services/siteService';

const fbIcon = (
    <svg
        width="56px"
        height="56px"
        viewBox="0 0 56 56"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <title>Path</title>
        <desc>Created with Sketch.</desc>
        <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd">
            <g
                id="Contact-Us_21"
                transform="translate(-569.000000, -683.000000)"
                fill="#FF7531"
                fillRule="nonzero">
                <g
                    id="facebook-square"
                    transform="translate(569.000000, 683.000000)">
                    <path
                        d="M46,0 C51.0810186,0 55.1999989,4.11898022 55.1999989,9.19999981 L55.1999989,46 C55.1999989,51.0810186 51.0810186,55.1999989 46,55.1999989 L9.19999981,55.1999989 C4.11898022,55.1999989 0,51.0810186 0,46 L0,9.19999981 C0,4.11898022 4.11898022,0 9.19999981,0 L46,0 Z M36.7999992,16.7439997 L36.7999992,10.3499998 L31.5329993,10.3499998 C26.7029994,10.3499998 23.6669995,14.0299997 23.6669995,19.2969996 L23.6669995,23.1379995 L18.3999996,23.1379995 L18.3999996,29.5089994 L23.6669995,29.5089994 L23.6669995,44.8499998 L30.2219994,44.8499998 L30.2219994,29.5089994 L35.4889993,29.5089994 L36.7999992,23.1379995 L30.2219994,23.1379995 L30.2219994,20.5619996 C30.2219994,18.0319996 31.5559993,16.7439997 34.1779993,16.7439997 L36.7999992,16.7439997 Z"
                        id="Shape"></path>
                </g>
            </g>
        </g>
    </svg>
);

const twIcon = (
    <svg
        width="56px"
        height="56px"
        viewBox="0 0 56 56"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <title>Path</title>
        <desc>Created with Sketch.</desc>
        <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd">
            <g
                id="Contact-Us_21"
                transform="translate(-693.000000, -683.000000)"
                fill="#FF7531"
                fillRule="nonzero">
                <g
                    id="twitter-square"
                    transform="translate(693.000000, 683.000000)">
                    <path
                        d="M46,0 C51.0810186,0 55.1999989,4.11898022 55.1999989,9.19999981 L55.1999989,46 C55.1999989,51.0810186 51.0810186,55.1999989 46,55.1999989 L9.19999981,55.1999989 C4.11898022,55.1999989 0,51.0810186 0,46 L0,9.19999981 C0,4.11898022 4.11898022,0 9.19999981,0 L46,0 Z M35.8339993,13.339983 C33.5270571,13.3351469 31.3447001,14.3861089 29.9101317,16.1927685 C28.4755633,17.9994281 27.9464911,20.3631722 28.4739994,22.6089995 C22.3995352,22.3073563 16.7391501,19.4395393 12.9029997,14.7199997 C10.8728958,18.1662303 11.9052353,22.5992176 15.2489997,24.7939995 C14.0496396,24.7650504 12.8746064,24.4496052 11.8219998,23.8739995 L11.8219998,23.9429995 C11.8186566,27.5445894 14.3616341,30.6462514 17.8939996,31.3489994 C16.7771589,31.655877 15.6048992,31.7030821 14.4669997,31.4869993 C15.4588642,34.5638328 18.295807,36.6707479 21.5279996,36.7309992 C18.3646686,39.215588 14.3434504,40.3408672 10.3499998,39.8589992 C13.8019784,42.0728445 17.8181186,43.2465475 21.9189995,43.2400264 C35.8109993,43.2400264 43.4009991,31.7399993 43.4009991,21.7579995 L43.4009991,20.7919996 C44.873347,19.7221027 46.1429204,18.3980077 47.149999,16.8819997 C45.7929991,17.4799996 44.3439991,17.8939996 42.8029991,18.0779996 C44.3669991,17.1349996 45.5629991,15.6629997 46.137999,13.8919997 C44.6659991,14.7659997 43.0559991,15.3869997 41.3309991,15.7319997 C39.9022659,14.2037644 37.9030737,13.3374477 35.8109993,13.339983 L35.8339993,13.339983 Z"
                        id="Shape"></path>
                </g>
            </g>
        </g>
    </svg>
);

const igIcon = (
    <svg
        width="56px"
        height="56px"
        viewBox="0 0 56 56"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <title>Shape</title>
        <desc>Created with Sketch.</desc>
        <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd">
            <g
                id="Contact-Us_21"
                transform="translate(-819.000000, -683.000000)"
                fill="#FF7531"
                fillRule="nonzero">
                <g
                    id="instagram-square"
                    transform="translate(819.000000, 683.000000)">
                    <path
                        d="M46,0 C51.0810186,0 55.1999989,4.11898022 55.1999989,9.19999981 L55.1999989,46 C55.1999989,51.0810186 51.0810186,55.1999989 46,55.1999989 L9.19999981,55.1999989 C4.11898022,55.1999989 0,51.0810186 0,46 L0,9.19999981 C0,4.11898022 4.11898022,0 9.19999981,0 L46,0 Z M34.7529993,10.3499998 L20.4699996,10.3499998 C14.5589997,10.3499998 10.5799998,14.1449997 10.3499998,19.9179996 L10.3499998,34.7069993 C10.3499998,37.6969992 11.3159998,40.2499992 13.2709997,42.1359991 C15.070997,43.8201099 17.430475,44.7786479 19.8949996,44.8269991 L20.5159996,44.8499998 L34.6839993,44.8499998 C37.6739992,44.8499998 40.2039992,43.8839991 41.9979991,42.1359991 C43.7879005,40.3285747 44.8027412,37.8946072 44.8269991,35.3509993 L44.8499998,34.7529993 L44.8499998,20.4699996 C44.8499998,17.5259996 43.8839991,15.0419997 42.0669991,13.2249997 C40.2780323,11.4495427 37.8711333,10.4356777 35.3509993,10.3959998 L34.7529993,10.3729998 L34.7529993,10.3499998 Z M20.4929996,13.5699997 L34.8449993,13.5699997 C36.9149992,13.5699997 38.6629992,14.1679997 39.9049992,15.4099997 C40.9859992,16.5599997 41.6759991,18.1239996 41.7679991,19.9409996 L41.7679991,34.7299993 C41.7679991,36.8919992 41.0319991,38.6399992 39.7669992,39.8129992 C38.6169992,40.8939992 37.0759992,41.5149991 35.2129993,41.6069991 L20.5159996,41.6069991 C18.4229996,41.6069991 16.6749997,41.0089991 15.4329997,39.8129992 C14.2829997,38.6629992 13.6619997,37.1219992 13.5699997,35.2129993 L13.5699997,20.4239996 C13.5699997,18.3539996 14.1679997,16.6059997 15.4099997,15.3639997 C16.6672155,14.2152993 18.3070402,13.5757677 20.0099996,13.5699997 L34.8449993,13.5699997 L20.5159996,13.5699997 L20.4929996,13.5699997 Z M27.5999994,18.6299996 C22.9319168,18.9657979 19.3162925,22.8508546 19.3162925,27.5309994 C19.3162925,32.2111443 22.9319168,36.096201 27.5999994,36.4319992 C32.268082,36.096201 35.8837064,32.2111443 35.8837064,27.5309994 C35.8837064,22.8508546 32.268082,18.9657979 27.5999994,18.6299996 L27.5999994,18.6299996 Z M27.5999994,21.8269995 C30.7398097,21.8520191 33.2789797,24.3911891 33.3039993,27.5309994 C33.2789797,30.6708097 30.7398097,33.2099797 27.5999994,33.2349993 C24.4601891,33.2099797 21.9210191,30.6708097 21.8959995,27.5309994 C21.9210191,24.3911891 24.4601891,21.8520191 27.5999994,21.8269995 L27.5999994,21.8269995 Z M36.8459992,16.3989997 C35.7281749,16.3989997 34.8219993,17.3051753 34.8219993,18.4229996 C34.8219993,19.5408239 35.7281749,20.4469996 36.8459992,20.4469996 C37.9638235,20.4469996 38.8699992,19.5408239 38.8699992,18.4229996 C38.8699992,17.3051753 37.9638235,16.3989997 36.8459992,16.3989997 L36.8459992,16.3989997 Z"
                        id="Shape"></path>
                </g>
            </g>
        </g>
    </svg>
);

function ThankYou({ data, listSite }) {
    saveList(listSite);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <DefaultLayout>
            <div style={{ backgroundColor: '#F2F2F2', padding: '4rem 0' }}>
                <div
                    className="container thank-you"
                    style={{ textAlign: 'center' }}>
                    <h2
                        style={{
                            marginBottom: '0.5rem',
                            padding: '1rem 1rem 0 1rem',
                        }}
                        className="contact-header">
                        Thank you for contacting We Make Footballers.
                    </h2>
                    <hr style={{ width: 120, border: '1px solid #EE7925' }} />
                    <p
                        style={{
                            color: 'rgba(26,25,25,0,7)',
                            marginBottom: '2rem',
                        }}>
                        Your enquiry has been sent successfully!
                        <br />A member of the team shall be in touch soon.
                    </p>
                    <b style={{ padding: '4rem 0' }}>
                        While you wait for a responese, follow us out on social
                        media:
                    </b>
                    <div
                        style={{
                            marginTop: '2rem',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                        {data &&
                            data.map((item, index) => {
                                if (item.title === 'Facebook')
                                    return (
                                        <a
                                            key={index}
                                            href={item.des || '#'}
                                            target="_blank">
                                            {fbIcon}
                                        </a>
                                    );
                                if (item.title === 'Twitter')
                                    return (
                                        <a
                                            target="_blank"
                                            key={index}
                                            href={item.des || '#'}
                                            style={{ margin: '0 2rem' }}>
                                            {twIcon}
                                        </a>
                                    );
                                if (item.title === 'Insta')
                                    return (
                                        <a
                                            key={index}
                                            href={item.des || '#'}
                                            target="_blank">
                                            {igIcon}
                                        </a>
                                    );
                            })}
                    </div>
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '2rem',
                            maxWidth: 600,
                            margin: '2rem auto',
                        }}>
                        <h4 style={{ color: '#E68A40' }}>
                            Also - did you know that we are a franchise?
                        </h4>
                        <p style={{ color: 'rgba(26,25,25,0.7)' }}>
                            If you are interested in running your own We Make
                            Footballers Academy in your area,{' '}
                            <a
                                style={{
                                    color: '#FF7531',
                                    textDecoration: 'underline',
                                }}
                                href="https://franchisewmf.com/">
                                find out more about franchising opportunities.
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export async function getStaticProps() {
    const listRes = await siteService.getListSite();
    const listSite = listRes.data.data.lstSite;

    const footerConfig = await siteService.getFooterConfig();

    const data = footerConfig.data.data.cfg_value;

    return { props: { data, listSite } };
}

export default ThankYou;
