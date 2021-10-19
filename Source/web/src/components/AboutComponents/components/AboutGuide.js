import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Utils from 'src/common/Utils';
import { siteActionType } from 'src/redux/actions/actionTypes';

export default function AboutGuide(props) {
    const title = props.item.cfg_title;
    const [newTitle, setNewTitle] = useState('');
    const [defaultAcademy, setDefaultAcademy] = useState({});
    const dispatch = useDispatch();
    const [lstCourse, setLstCourse] = useState([]);
    const siteReducer = useSelector((state) => state.siteReducer);

    //! useEffect
    useEffect(() => {
        setDefaultAcademy(
            JSON.parse(localStorage.getItem('defaultAcademy')) || {},
        );
    }, []);

    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.PICK_DEFAULT_ACADEMY) {
                setDefaultAcademy(
                    JSON.parse(localStorage.getItem('defaultAcademy')),
                );
            }
            if (siteReducer.type === siteActionType.GET_LIST_COURSE_SUCCESS) {
                setLstCourse(
                    siteReducer.data.sort(
                        (a, b) => a.course_price - b.course_price,
                    ),
                );
            }
        }
    }, [siteReducer]);

    useEffect(() => {
        if (title && defaultAcademy && !!lstCourse[0]?.course_price) {
            for (let i = 0; i < title.length; i++) {
                if (title[i] === '£') {
                    setNewTitle(
                        title.substring(0, i + 1) +
                            lstCourse[0].course_price +
                            title.substring(i + 2),
                    );
                }
            }
        } else {
            setNewTitle(title);
        }
    }, [title, lstCourse[0]]);

    useEffect(() => {
        dispatch({
            type: siteActionType.GET_LIST_COURSE,
            company_id: defaultAcademy.pa_companyId,
            location_id: defaultAcademy.pa_locationId,
            course_type: 'course',
        });
    }, [defaultAcademy]);

    return (
        <div className="about-guide">
            <div className="container">
                <h2>{newTitle}</h2>
            </div>
            <div className="wrap-guide">
                <div className="col-left">
                    <div className="wrap-image">
                        <img
                            loading="lazy"
                            src={Utils.getThumb(props.item.cfg_des)}
                            alt="Wemakefootballers"
                        />
                    </div>
                </div>
                <div className="col-right">
                    <div
                        style={{ maxWidth: 555 }}
                        dangerouslySetInnerHTML={{
                            __html: props.item.cfg_content,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
