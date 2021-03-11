import ModelManager from 'common/ModelManager';
import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { getDetailSite } from 'redux/actions/detailSiteAction';
import Intro from 'views/Homepage/components/Intro';
import JoinUsBanner from './components/JoinUsBanner';

import 'slick-carousel/slick/slick.css';
import 'css/slick-theme.css';

import { Button } from 'react-bootstrap';

const ClearBoth = function () {
    return <div style={{ clear: 'both' }} />;
};

function JoinUs() {
    //! state
    const dispatch = useDispatch();
    const detailSiteReducer = useSelector((state) => state.detailSiteReducer);
    const currentAcademyId = ModelManager.getLocation()?.ms_id;
    const { data } = detailSiteReducer;

    const mapvalue = [1, 1];
    const cfg_value = [1, 1, 1];
    //! useEffect
    useEffect(() => {
        dispatch(getDetailSite({ currentAcademyId, cate: 14 }));
    }, []);

    //! Demo UI Feedback
    const lstFb = [1, 122, 123, 123, 1, 122, 123, 123];
    const settings = {
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    autoplaySpeed: 6000,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplaySpeed: 6000,
                    autoplay: true,
                    infinite: true,
                },
            },
        ],
    };

    return (
        <Fragment>
            <JoinUsBanner data={data?.about || {}} />
            <ClearBoth />
            <Intro intro={data?.trainingIntro?.cfg_value || []} />
            <ClearBoth />
            <div className="about-type">
                <div className="container">
                    <h2
                        className="heading-w"
                        style={{
                            maxWidth: '800px',
                            marginRight: 'auto',
                            marginLeft: 'auto',
                        }}>
                        What role is right for you?
                    </h2>
                    <p className="text-1">
                        We are looking for inspiring people to help children to
                        become to best footballers they can be.{' '}
                    </p>
                </div>

                <div className="type-anchor">
                    <div className="container">
                        <div className="list-item-card-2">
                            <div className="row">
                                {mapvalue.map((item, index) => (
                                    <div key={index} className="col-6">
                                        <div className="item">
                                            <img
                                                alt=""
                                                src={require('images/icon-bell.png')}
                                                className="img"
                                            />
                                            <h3 className="title">
                                                Appy for a coaching position
                                            </h3>
                                            <p className="description">
                                                Our coaches are aspirational and
                                                energetic football enthusiasts
                                                who our customers and players
                                                look up to. Please fill out the
                                                application form via the button
                                                below if you want the chance of
                                                joining the team
                                            </p>
                                            <a
                                                // href={route[index]}
                                                className="more">
                                                MORE INFORMATION
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ClearBoth />

            <div className="box-slide-review " style={{ top: '-55px' }}>
                <Slider className="slide responsive" {...settings}>
                    {lstFb &&
                        lstFb.map((item, index) => (
                            <div key={index} className="col-6">
                                <div className="box-acc-review">
                                    <img
                                        alt=""
                                        // src={Utils.getThumb(item.fb_image)}
                                        className="avatar"
                                    />
                                    <div className="info">
                                        <p className="description">adfasfd</p>
                                        <h3 className="name">asdfsadf</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                </Slider>
                <div
                    style={{ marginTop: 30, float: 'right', height: 20 }}
                    className="trustpilot-widget"
                    data-locale="en-GB"
                    data-template-id="5418015fb0d04a0c9cf721f2"
                    data-businessunit-id="5630b23d0000ff000584db47"
                    data-style-height="30px"
                    data-style-width="100%"
                    data-theme="light"
                    data-stars="4,5"
                    data-review-languages="en">
                    <a
                        className="alink"
                        href="https://uk.trustpilot.com/review/wemakefootballers.com"
                        target="_blank"
                        rel="noopener">
                        See more Reviews
                    </a>
                </div>
            </div>

            <ClearBoth />

            <div className="about-coach">
                <div className="container">
                    <h2>Franchise opportunities</h2>
                    <p
                    // dangerouslySetInnerHTML={{
                    //     __html: data.about3?.cfg_content,
                    // }}
                    >
                        Create a successful franchise business with We Make
                        Footballers. We are the UK’s number 1 football coaching
                        business for 4-12 year olds. If you want to spend every
                        day doing something you are passionate about, you can
                        join the We Make Footballers family on a Part-Time or
                        Full-Time basis by launching your own WMF franchise. We
                        are a nationwide football coaching franchise, where many
                        of our coaches have developed and become franchise
                        owners. Our franchising model offers coaches the
                        opportunity to become business owners and create a
                        viable career within the football industry.
                    </p>
                </div>
            </div>
            <ClearBoth />
            <div className="about-secure">
                <div className="container">
                    <div className="box-list-item-card">
                        <div className="row">
                            {cfg_value.map((item, index) => (
                                <div className="col-4" key={index}>
                                    <div className="item">
                                        <img
                                            alt=""
                                            src={require('images/img2.jpg')}
                                        />
                                        <h3 className="title">
                                            Make a difference
                                        </h3>
                                        <div className="description">
                                            Our academy managers are, at
                                            minimum, FA level 3 qualified, with
                                            younger coaches Level 1 and 2
                                            qualified. We also hold our own WMF
                                            exams which coaches must complete.
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ClearBoth />
            <div className="container" style={{ marginBottom: '120px' }}>
                <div className="enquire">
                    <h4
                        style={{
                            fontSize: 45,
                            margin: '0 auto',
                            maxWidth: 700,
                        }}>
                        Enquire about 1-to-1 training for your child
                    </h4>
                    <p style={{ marginBottom: '3rem' }}>
                        Your child will thank you for it in the future
                    </p>
                    <Button
                        // onClick={() => {
                        //     enquireBox.current.scrollIntoView({
                        //         behavior: 'smooth',
                        //     });
                        // }}
                        style={{
                            backgroundColor: 'white',
                            color: '#FF7531',
                            borderRadius: 6,
                            boxShadow: 'none',
                            border: 'none',
                            padding: '1.5rem 3rem',
                            textTransform: 'uppercase',
                        }}>
                        Enquire about 1-to-1 coaching
                    </Button>
                </div>
            </div>
            <ClearBoth />
        </Fragment>
    );
}

export default JoinUs;
