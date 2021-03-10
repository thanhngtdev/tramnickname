import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import Select from 'react-select';
import { CommonStyle } from '../../common/Styles';
import { useSelector } from 'react-redux';

Coaching.propTypes = {
    data: propTypes.object,
};

function Coaching(props) {
    const { lstSite } = useSelector((state) => state.siteReducer);

    console.log('Coaching -> props', props);
    return (
        <div className="tab-1">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    paddingBottom: 30,
                }}>
                <h2 style={{ fontWeight: '300' }}>
                    Are you ready to lead, inspire and coach?
                </h2>
                <h3 style={{ fontWeight: '100' }}>
                    Please fill out the application form below if you’re ready
                    to join the team
                </h3>
            </div>
            <div className="wSelect2">
                <label>Chosen Academy (first choice)</label>
                <Select
                    value={{}}
                    options={[]}
                    isSearchable={false}
                    isMulti={false}
                    getOptionLabel={(option) => option.ms_name}
                    getOptionValue={(option) => option.ms_id}
                    styles={CommonStyle.select2}
                    onChange={(option) => {}}
                />
                <label className="input-error"></label>
            </div>
            <div className="wSelect2">
                <label>Chosen Academy (second choice)</label>
                <Select
                    value={lstSite[0]}
                    options={lstSite}
                    isSearchable={false}
                    isMulti={false}
                    getOptionLabel={(option) => option.ms_name}
                    getOptionValue={(option) => option.ms_id}
                    styles={CommonStyle.select2}
                    onChange={(option) => {}}
                />
                <label className="input-error"></label>
            </div>
            <div className="wSelect2">
                <label>Chosen Academy (third choice)</label>
                <Select
                    value={lstSite[0]}
                    options={lstSite}
                    isSearchable={false}
                    isMulti={false}
                    getOptionLabel={(option) => option.ms_name}
                    getOptionValue={(option) => option.ms_id}
                    styles={CommonStyle.select2}
                    onChange={(option) => {}}
                />
                <label className="input-error"></label>
            </div>
        </div>
    );
}

export default Coaching;
