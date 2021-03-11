import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BannerTop from './components/BannerTop';
import CoachInfo from './components/CoachInfo';
import Intro from 'views/Homepage/components/Intro';
import BookTrial from 'views/Homepage/components/BookTrial';
import Testimonial from './components/Testimonial';
import TrainingService from './components/TrainingService';
import CoachTeam from './components/CoachTeam';
import TrainingReason from './components/TrainingReason';
import QNA from 'component/camp/QNA';
import RelateAreas from './components/RelateAreas';
import { useParams } from 'react-router-dom';
import 'css/franchise.css';
import _ from 'lodash';
import { getFranchiseDetail } from 'redux/actions/franchise';

function Franchise() {
    //! State
    const dispatch = useDispatch();
    console.log(useParams(), 'param');
    let { title } = useParams();

    const franchiseReducer = useSelector((state) => state.franchiseReducer);
    // console.log(franchiseReducer, 'franchise');
    const { data, isFetching, error } = franchiseReducer;

    //! Effect
    useEffect(() => {
        dispatch(getFranchiseDetail({ title }));
    }, []);

    //! Function

    //! Render
    if (isFetching) {
        return 'Loading...';
    }

    if (error) {
        return 'Something went wrong!!';
    }

    return (
        <div>
            <BannerTop site={data?.site || {}} />
            <CoachInfo coach={data?.coach || {}} />
            <Intro intro={data?.homeIntro?.cfg_value || []} />
            <div className="franchise-review">
                <div className="container">
                    <Testimonial lstFb={data?.testimonial || []} />
                </div>
            </div>
            <TrainingService
                site={data?.site || {}}
                service={data?.service || {}}
            />
            <TrainingReason reason={data?.footballBegining || {}} />
            <CoachTeam
                staff={data?.coach?.staff || []}
                site={data?.site || {}}
            />
            <BookTrial parentFb={data?.parentFb} />
            <QNA data={data?.faq || []} />
            <RelateAreas
                site={data?.site || {}}
                article={data?.article || {}}
            />
        </div>
    );
}

export default Franchise;
