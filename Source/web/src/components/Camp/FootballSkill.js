import useGetWidth from 'src/hooks/useGetWidth';
import PropTypes from 'prop-types';
import React from 'react';
import Utils from 'src/common/Utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';

FootballSkill.propTypes = {
    data: PropTypes.object,
};

export default function FootballSkill(props) {
    //   const [title, setTitle] = useState(props.data.cfg_title);
    const isMobile = useGetWidth() <= 767;

    //   useEffect(() => {
    //     const currentAcademyName = ModelManager.getLocation()?.ms_name;
    //     if (props.data.cfg_title.includes("Academy") && currentAcademyName) {
    //       const name = props.data.cfg_title;
    //       setTitle(name.replace("Academy", currentAcademyName + " Academy"));
    //     }
    //   }, []);

    return (
        // one-training-skill
        <div
            className={`box-football-beginning football-skill ${
                props.noTitle && `one-training-skill`
            } `}>
            <div
                className="container"
                style={{
                    position: 'relative',
                }}>
                <h3 className="heading">{props.data?.cfg_title || ''}</h3>
                <div className="box-beginning-list">
                    <div
                        className="list"
                        style={
                            props.noTitle && !isMobile
                                ? { height: '435px' }
                                : {}
                        }>
                        {props.data.cfg_value &&
                            props.data.cfg_value.map((item, index) => {
                                return (
                                    <div className="item" key={index}>
                                        <LazyLoadImage
                                            alt=""
                                            className="img"
                                            src={Utils.getThumb(item['icon'])}
                                        />
                                        {!props.noTitle && (
                                            <h3 className="title">
                                                {item['title']}
                                            </h3>
                                        )}

                                        <p className="description">
                                            {item['des']}
                                        </p>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
}
