import React, { useEffect } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import Select from 'react-select';
import { CommonStyle } from '../../common/Styles';
import { useSelector } from 'react-redux';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import IconVerify from '../include/Checkbox/IconVerify';
import IconUnVerify from '../include/Checkbox/IconUnVerify';
import Captcha from '../Captcha';
import BorderButton from '../include/BorderButton';
import PathRoute from '../../common/PathRoute';

Coaching.propTypes = {
    data: propTypes.object,
};

function Coaching(props) {
    const { lstSite } = useSelector((state) => state.siteReducer);

    console.log('Coaching -> props', props);

    useEffect(() => {
        const btn = document.getElementById('attach');
        const inputAttach = document.getElementById('attachInput');

        btn.addEventListener('click', () => {
            inputAttach.click();
        });

        inputAttach.addEventListener('change', () => {
            //get value file attach
            if (inputAttach.value) {
                console.log(inputAttach.value, 'value attach');
            } else {
            }
        });
    }, []);

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

            <h3 style={{ fontWeight: '100' }}>Personal Info</h3>

            <div className="wSelect2">
                <label>Your Name</label>
                <input
                    // disabled={true}
                    type="text"
                    className="inputText"
                    placeholder="example@mail.com"
                    // onChange={(event) => {
                    //     setEmail(event.target.value);
                    //     setEmailError('');
                    // }}
                />
                <label className="input-error">{/* {emailError} */}</label>
            </div>
            <div className="wSelect2">
                <label>Email</label>
                <input
                    type="text"
                    className="inputText"
                    placeholder="Example name"
                    // onChange={(event) => {
                    //     setFirstName(event.target.value);
                    //     setFirstNameError('');
                    // }}
                />
                <label className="input-error">{/* {firstNameError} */}</label>
            </div>
            <div className="wSelect2">
                <label>Telephone</label>
                <PhoneInput
                    flag={flags}
                    defaultCountry="GB"
                    international
                    // value={}
                    // onChange={(event) => {
                    //     // console.log(event);
                    //     setPhone(event);
                    //     setPhoneError('');
                    // }}
                />
                <label className="input-error">{/* {firstNameError} */}</label>
            </div>

            <h2 style={{ fontWeight: '300' }}>Coaching Info</h2>

            <div className="wSelect2">
                <label>Do you have a valid DBS?</label>
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
                <label className="input-error">asdfas</label>
                <h3 style={{ fontWeight: '100' }}>
                    Coaching qualification level (tick boxes that apply)
                </h3>
                <div style={{ paddingTop: '1rem' }}>
                    {true ? <IconVerify /> : <IconUnVerify />} FA Level 1
                </div>
                <div style={{ paddingTop: '1rem' }}>
                    {true ? <IconVerify /> : <IconUnVerify />} FA Level 2
                </div>
                <div style={{ paddingTop: '1rem' }}>
                    {true ? <IconVerify /> : <IconUnVerify />} FA Level 3
                </div>
                <div style={{ paddingTop: '1rem' }}>
                    {true ? <IconVerify /> : <IconUnVerify />} FA Level 4(Pro
                    License)
                </div>
                <div style={{ paddingTop: '1rem' }}>
                    {true ? <IconVerify /> : <IconUnVerify />} Youth Module 1
                </div>
                <div style={{ paddingTop: '1rem' }}>
                    {true ? <IconVerify /> : <IconUnVerify />} Youth Module 2
                </div>
                <div style={{ paddingTop: '1rem' }}>
                    {true ? <IconVerify /> : <IconUnVerify />}Youth Module 3
                </div>
                <div style={{ paddingTop: '1rem' }}>
                    {true ? <IconVerify /> : <IconUnVerify />} Youth Module 4
                </div>
                <div style={{ paddingTop: '1rem' }}>
                    {true ? <IconVerify /> : <IconUnVerify />} FA Futsal 1
                </div>
                <div style={{ paddingTop: '1rem' }}>
                    {true ? <IconVerify /> : <IconUnVerify />} FA Futsal 2
                </div>
                <div style={{ paddingTop: '1rem' }}>
                    {true ? <IconVerify /> : <IconUnVerify />} Other
                </div>
            </div>
            <div className="wSelect2">
                <label>Other Qualifications?</label>
                <textarea className="textArea" />
            </div>

            <h2 style={{ fontWeight: '300' }}>Additional Info</h2>
            <div className="wSelect2">
                <label>Why do you want to work for us?</label>
                {/* <input
                    type="text"
                    className="inputText"
                    mul
                    // placeholder="Example name"
                    // onChange={(event) => {
                    //     setFirstName(event.target.value);
                    //     setFirstNameError('');
                    // }}
                /> */}
                <textarea className="textArea" />
            </div>
            <div className="wSelect2">
                <label>What level of football have you played?</label>
                <h6 style={{ fontWeight: '100', margin: '0' }}>
                    (Although we may need your skills for the annual coach
                    tournament, we don't hire based on footballing ability so
                    please be honest)*
                </h6>
                <input
                    type="text"
                    className="inputText"
                    // placeholder="Example name"
                    // onChange={(event) => {
                    //     setFirstName(event.target.value);
                    //     setFirstNameError('');
                    // }}
                />
                <label className="input-error">{/* {firstNameError} */}</label>
            </div>
            <div className="wSelect2">
                <label>Attach CV (optional):</label>
                <input
                    type="file"
                    id="attachInput"
                    hidden="hidden"
                    // className="attach-file"
                    // placeholder="Example name"
                    // onChange={(event) => {
                    //     setFirstName(event.target.value);
                    //     setFirstNameError('');
                    // }}
                />
                <button id="attach" className="attach-file">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21.853"
                        height="22.611"
                        viewBox="0 0 21.853 22.611">
                        <g id="paperclip" transform="translate(0.998 0.612)">
                            <path
                                id="Path"
                                d="M19.438,9.662l-9.19,9.19a6,6,0,0,1-8.49-8.49l9.19-9.19a4,4,0,0,1,5.66,5.66l-9.2,9.19a2,2,0,0,1-2.83-2.83l8.49-8.48"
                                transform="translate(0.002 0.388)"
                                fill="none"
                                stroke="#fff"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-miterlimit="10"
                                stroke-width="2"
                            />
                        </g>
                    </svg>
                </button>
                <h6 style={{ fontWeight: '100', margin: '0' }}>
                    Eg: .pdf, .doc, .rtf
                </h6>
            </div>
            <div className="wSelect2">{/* <Captcha /> */}</div>
            <button
                className="btn-button-s"
                // onClick={() => {
                //     if (validateInput()) {
                //         const param = {
                //             siteId: locationId,
                //             siteName: location,
                //             email: email,
                //             date: moment(date).format('M/D/Y'),
                //         };
                //         dispatch({
                //             type: siteActionType.BOOK_TRAINING,
                //             param,
                //         });
                //     }
                // }}
            >
                Submit application
            </button>
            <div>
                <p>
                    For more information about our privacy practices, please
                    read our <a href={'policies/privacy'}>Privacy Policy.</a>
                </p>
                <p>
                    By clicking above, you agree that we may process your
                    information in accordance with these terms.
                </p>
            </div>
        </div>
    );
}

export default Coaching;
