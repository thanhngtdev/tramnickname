import Link from 'next/link';
import React from 'react';
import AcademyMap from 'src/components/include/AcademyMap';
import saveList from 'src/hooks/useSaveList';
import DefaultLayout from 'src/layout/DefaultLayout';
import siteService from 'src/services/siteService';

function Location({ listSite }) {
    saveList(listSite);
    return (
        <DefaultLayout>
            <div className="map">
                <div className="map-frame">
                    <AcademyMap
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyClAeE9K0S0LZQ3DiTg0-j_w8HvVuMYgoc&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>

                <div className="container map-page">
                    <h2>Find your academy</h2>
                    {listSite && (
                        <div className="academy">
                            <div className="acade-left">
                                <h3>London</h3>
                                {listSite.map((item) => {
                                    if (item.ms_region === 'London')
                                        return (
                                            <Link
                                                href={'/' + item.ms_alias}
                                                key={item.ms_id}>
                                                <a>{item.ms_name}</a>
                                            </Link>
                                        );
                                    return null;
                                })}
                            </div>
                            <div className="acade-right">
                                <div>
                                    <h3>North West England</h3>
                                    {listSite.map((item) => {
                                        if (
                                            item.ms_region ===
                                            'North West England'
                                        )
                                            return (
                                                <Link
                                                    href={'/' + item.ms_alias}
                                                    key={item.ms_id}>
                                                    <a>{item.ms_name}</a>
                                                </Link>
                                            );
                                        return null;
                                    })}
                                </div>
                                <div>
                                    <h3>South England</h3>
                                    {listSite.map((item) => {
                                        if (item.ms_region === 'South England')
                                            return (
                                                <Link
                                                    href={'/' + item.ms_alias}
                                                    key={item.ms_id}>
                                                    <a>{item.ms_name}</a>
                                                </Link>
                                            );
                                        return null;
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
}

export async function getStaticProps() {
    const listRes = await siteService.getListSite();
    const listSite = listRes.data.data.lstSite;

    return { props: { listSite } };
}

export default Location;
