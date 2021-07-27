import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { clearDetailSite, getDetailSite } from "redux/actions/detailSiteAction";
import AboutUs from "components/Camp/AboutUs";
import Intro from "components/Homepage/Intro";
import Testimonial from "components/Testimonial";
import WhyWMF from "components/Camp/WhyWMF";
import QNA from "components/Camp/QNA";
import ModelManager from "common/ModelManager";
import useTruspilot from "hooks/useTruspilot";
import InstaBox from "components/Camp/InstaBox";
import BookTrialSchool from "./components/BookTrialSchool";
import FootballSkill from "./components/FootballSkill";
import _ from "lodash";
import DefaultLayout from "layout/DefaultLayout";
import TrustUs from "./components/TrustUs";
import Enquire from "./components/Enquire";
import siteService from "services/siteService";

function SchoolTraining({ data, listSite }) {
  const enquireBox = useRef(null);

  return (
    <DefaultLayout seo={data.seoMeta}>
      <AboutUs data={data?.about || {}} />

      <div className="intro-school">
        <Intro intro={data?.trainingIntro?.cfg_value || []} />
      </div>
      <div className="football-school">
        <FootballSkill data={data?.skillGain || {}} />
      </div>

      <div className="one-training">
        <Testimonial data={data?.testimonial || {}} style={"change-color"} />
      </div>

      <TrustUs data={data?.gallery || {}} />

      <div className="enquire-school">
        <Enquire enquireBox={enquireBox} />
      </div>

      <WhyWMF data={data?.whyWMF || {}} />
      <div className="booking-weekly">
        <BookTrialSchool
          _ref={enquireBox}
          parentFb={data?.parentFb || {}}
          listSite={listSite || []}
        />
      </div>

      <div className="insta-weekly">
        <InstaBox instaFeed={data?.instaFeed || {}} />
      </div>

      <div className="faq-weekly">
        <QNA data={data?.faq || []} />
      </div>
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const listRes = await siteService.getListSite();
  const listSite = listRes.data.data.lstSite;

  const siteDetail = await siteService.getDetailSite({
    id: listSite[0].ms_id,
    cate: 21,
  });

  const data = siteDetail.data.data;

  return { props: { data, listSite } };
}

export default SchoolTraining;
