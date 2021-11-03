import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import Constants from 'src/common/Constants';
import Utils from 'src/common/Utils';
import saveList from 'src/hooks/useSaveList';
import siteService from 'src/services/siteService';

const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));
const AcademyMap = dynamic(() => import('src/components/include/AcademyMap'));

function Location({ listSite }) {
    saveList(listSite);
    return (
        <DefaultLayout>
            <div className="map">
                <div className="map-frame">
                    <AcademyMap
                        googleMapURL={Constants.GOOGLE_MAP_URL}
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
                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    Utils.onClickLocation(item);
                                                }}
                                                key={item.ms_id}>
                                                {item.ms_name}
                                            </a>
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
                                                <a
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        Utils.onClickLocation(
                                                            item,
                                                        );
                                                    }}
                                                    key={item.ms_id}>
                                                    {item.ms_name}
                                                </a>
                                            );
                                        return null;
                                    })}
                                </div>
                                <div>
                                    <h3>South England</h3>
                                    {listSite.map((item) => {
                                        if (item.ms_region === 'South England')
                                            return (
                                                <a
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        Utils.onClickLocation(
                                                            item,
                                                        );
                                                    }}
                                                    key={item.ms_id}>
                                                    {item.ms_name}
                                                </a>
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

    return {
        props: {
            listSite,
            //  revalidate: Constants.REVALIDATE
        },
    };
}

export default Location;
