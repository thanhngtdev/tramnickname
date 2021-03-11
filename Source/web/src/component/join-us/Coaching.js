import React, { useEffect } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import Select from 'react-select';
import { CommonStyle } from 'common/Styles';
import { useSelector } from 'react-redux';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import IconVerify from 'component/include/Checkbox/IconVerify';
import IconUnVerify from 'component/include/Checkbox/IconUnVerify';
import Captcha from '../Captcha';
import BorderButton from 'component/include/BorderButton';
import PathRoute from 'common/PathRoute';
import { Formik } from 'formik';
import * as Yup from 'yup';

Coaching.propTypes = {
    data: propTypes.object,
};

const ARRAY = [
    {
        id: 1,
        label: 'FA level 1',
    },
    {
        id: 2,
        label: 'FA level 2',
    },
    {
        id: 3,
        label: 'FA level 3',
    },
    {
        id: 4,
        label: 'FA level 4',
    },
    {
        id: 5,
        label: 'Youth Module 1',
    },
    {
        id: 6,
        label: 'Youth Module 2',
    },
    {
        id: 7,
        label: 'Youth Module 3',
    },
    {
        id: 8,
        label: 'Youth Module 4',
    },
    {
        id: 9,
        label: 'FA Futsal 1',
    },
    {
        id: 10,
        label: 'FA Futsal 2',
    },
    {
        id: 12,
        label: 'Other',
    },
];

function Coaching(props) {
    console.log('Coaching -> props', props);
    const { lstSite } = useSelector((state) => state.siteReducer);

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

    const initialValues = {
        first_academy: lstSite[0],
        second_academy: lstSite[0],
        third_academy: lstSite[0],
        name: '',
        email: '',
        telephone: '',
        dbs: undefined,
        qualifications: [],
        other_qualification: '',
        additional_info: '',
        level: '',
    };

    const validation = {
        // first_academy: Yup.object().required('Please select First Academy'),
        // second_academy: Yup.object().required('Please select Second Academy'),
        // third_academy: Yup.object().required('Please select Third Academy'),
        name: Yup.string().trim().required('Please enter your name'),
        email: Yup.string()
            .trim()
            .required('Please enter your email')
            .email('Invalid email'),
        telephone: Yup.string()
            .trim()
            .required('Please enter your phone')
            .matches(
                /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
                'Invalid phone number',
            ),
    };
    const validationSchema = Yup.object().shape(validation);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={() => {}}>
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
            }) => {
                console.log('Coaching -> errors', errors);
                const {
                    first_academy,
                    second_academy,
                    third_academy,
                    // name,
                    // email,
                    telephone,
                    dbs,
                    qualifications,
                    // other_qualification,
                    // additional_info,
                    // level,
                } = values;
                console.log('Coaching -> values', values);

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
                                Please fill out the application form below if
                                you’re ready to join the team
                            </h3>
                        </div>
                        <div className="wSelect2">
                            <label>Chosen Academy (first choice)</label>
                            <Select
                                value={first_academy}
                                options={lstSite}
                                isSearchable={false}
                                isMulti={false}
                                getOptionLabel={(option) => option.ms_name}
                                getOptionValue={(option) => option.ms_id}
                                styles={CommonStyle.select2}
                                onChange={(option) =>
                                    setFieldValue('first_academy', option)
                                }
                            />
                            <label className="input-error"></label>
                        </div>
                        <div className="wSelect2">
                            <label>Chosen Academy (second choice)</label>
                            <Select
                                value={second_academy}
                                options={lstSite}
                                isSearchable={false}
                                isMulti={false}
                                getOptionLabel={(option) => option.ms_name}
                                getOptionValue={(option) => option.ms_id}
                                styles={CommonStyle.select2}
                                onChange={(option) =>
                                    setFieldValue('second_academy', option)
                                }
                            />
                            <label className="input-error"></label>
                        </div>
                        <div className="wSelect2">
                            <label>Chosen Academy (third choice)</label>
                            <Select
                                value={third_academy}
                                options={lstSite}
                                isSearchable={false}
                                isMulti={false}
                                getOptionLabel={(option) => option.ms_name}
                                getOptionValue={(option) => option.ms_id}
                                styles={CommonStyle.select2}
                                onChange={(option) =>
                                    setFieldValue('third_academy', option)
                                }
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
                                placeholder="Example name"
                                onChange={handleChange('name')}
                            />
                            <label className="input-error">{errors.name}</label>
                        </div>
                        <div className="wSelect2">
                            <label>Email</label>
                            <input
                                type="text"
                                className="inputText"
                                placeholder="example@mail.com"
                                onChange={handleChange('email')}
                            />
                            <label className="input-error">
                                {errors.email}
                            </label>
                        </div>
                        <div className="wSelect2">
                            <label>Telephone</label>
                            <PhoneInput
                                flag={flags}
                                defaultCountry="GB"
                                international
                                value={telephone}
                                onChange={(event) => {
                                    setFieldValue('telephone', event);
                                }}
                            />
                            <label className="input-error">
                                {errors.telephone}
                            </label>
                        </div>

                        <h2 style={{ fontWeight: '300' }}>Coaching Info</h2>

                        <div className="wSelect2">
                            <label>Do you have a valid DBS?</label>
                            <Select
                                value={dbs}
                                options={[]}
                                isSearchable={false}
                                isMulti={false}
                                getOptionLabel={(option) => option.ms_name}
                                getOptionValue={(option) => option.ms_id}
                                styles={CommonStyle.select2}
                                onChange={(option) => {
                                    setFieldValue('dbs', option);
                                }}
                            />
                            <label className="input-error"></label>
                            <h3 style={{ fontWeight: '100' }}>
                                Coaching qualification level (tick boxes that
                                apply)
                            </h3>
                            {ARRAY.map((item) => {
                                const isChecked = qualifications.some(
                                    (el) => el === item.id,
                                );
                                return (
                                    <div
                                        key={item.id.toString()}
                                        style={{
                                            display: 'flex',
                                            paddingTop: '1rem',
                                            alignItems: 'center',
                                        }}
                                        onClick={() => {
                                            if (isChecked) {
                                                const arr = qualifications.filter(
                                                    (el) => el !== item.id,
                                                );
                                                setFieldValue(
                                                    'qualifications',
                                                    arr,
                                                );
                                            } else {
                                                const arr = [
                                                    ...qualifications,
                                                    item.id,
                                                ];
                                                setFieldValue(
                                                    'qualifications',
                                                    arr,
                                                );
                                            }
                                        }}>
                                        {isChecked ? (
                                            <IconVerify />
                                        ) : (
                                            <IconUnVerify />
                                        )}
                                        &nbsp;&nbsp;
                                        {item.label}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="wSelect2">
                            <label>Other Qualifications?</label>
                            <textarea
                                className="textArea"
                                onChange={handleChange('other_qualification')}
                            />
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
                            <textarea
                                className="textArea"
                                onChange={handleChange('additional_info')}
                            />
                        </div>
                        <div className="wSelect2">
                            <label>
                                What level of football have you played?
                            </label>
                            <h6 style={{ fontWeight: '100', margin: '0' }}>
                                (Although we may need your skills for the annual
                                coach tournament, we don't hire based on
                                footballing ability so please be honest)*
                            </h6>
                            <input
                                type="text"
                                className="inputText"
                                // placeholder="Example name"
                                onChange={handleChange('level')}
                            />
                            <label className="input-error">
                                {/* {firstNameError} */}
                            </label>
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
                                    <g
                                        id="paperclip"
                                        transform="translate(0.998 0.612)">
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
                        <button className="btn-button-s" onClick={handleSubmit}>
                            Submit application
                        </button>
                        <div>
                            <p>
                                For more information about our privacy
                                practices, please read our{' '}
                                <a href={'policies/privacy'}>Privacy Policy.</a>
                            </p>
                            <p>
                                By clicking above, you agree that we may process
                                your information in accordance with these terms.
                            </p>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
}

export default Coaching;
