import { Formik } from 'formik';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import dynamic from 'next/dynamic';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import Select from 'react-select';
import PathRoute from 'src/common/PathRoute';
import { CommonStyle } from 'src/common/Styles';

const AttachFileButton = dynamic(() =>
    import('src/components/AttachFileButton'),
);
const Captcha = dynamic(() => import('src/components/Captcha'));
const IconUnVerify = dynamic(() =>
    import('src/components/include/Checkbox/IconUnVerify'),
);
const IconVerify = dynamic(() =>
    import('src/components/include/Checkbox/IconVerify'),
);
const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));

import siteService from 'src/services/siteService';
import * as Yup from 'yup';
import Utils from 'src/common/Utils';

Coaching.propTypes = {
    data: PropTypes.object,
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

function Coaching({ listSite }) {
    //! state
    const history = useRouter();
    const initialValues = {
        first_academy: listSite[0],
        second_academy: listSite[0],
        third_academy: listSite[0],
        name: '',
        email: '',
        telephone: '',
        dbs: {},
        qualifications: [],
        other_qualification: '',
        additional_info: '',
        level: '',
        file: {},
    };

    const validation = {
        first_academy: Yup.object().required('Please select First Academy'),
        second_academy: Yup.object().required('Please select Second Academy'),
        third_academy: Yup.object().required('Please select Third Academy'),
        name: Yup.string().trim().required('Please enter your name'),
        email: Yup.string()
            .trim()
            .required('Please enter your email')
            .email('Invalid email'),
        telephone: Yup.string()
            .trim()
            .required('Please enter your phone')
            .matches(
                /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\\./0-9]*$/g,
                'Invalid phone number',
            ),
        dbs: Yup.object().required('SELECT A VALID DBS'),
        // qualifications: Yup.array().of(
        //     object().shape({
        //         value: string().required('Name is required'),
        //     }),
        // ),
        // .when('dbs', {
        //     is: (dbs) => dbs,
        //     then: Yup.array().required('sss'),
        // }),
    };
    const validationSchema = Yup.object().shape(validation);

    async function sendForm(param) {
        try {
            const res = await siteService.sendForm(param);
            // console.log(res.data, 'aaa');
            if (res.data.status === 200) {
                history.push(PathRoute.ThankYou);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            // initialErrors={initialErrors}
            validationSchema={validationSchema}
            onSubmit={(log) => {
                const response = window.grecaptcha.getResponse();
                if (response.length !== 0) {
                    log.type = 'coaching';
                    log.first_academy = log.first_academy.ms_id;
                    log.second_academy = log.second_academy.ms_id;
                    log.third_academy = log.third_academy.ms_id;
                    log.dbs = log.dbs.value;
                    // dispatch(sendForm(log));
                    // console.log("aaa");
                    sendForm({ param: log });
                }
            }}>
            {({
                values,
                errors,
                handleChange,
                handleSubmit,
                setFieldValue,
            }) => {
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
                    file,
                } = values;

                return (
                    <DefaultLayout>
                        <div className="holiday-camp">
                            <div className="container coaching">
                                <div className="tab-1">
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            paddingBottom: 30,
                                        }}>
                                        <h2 style={{ fontWeight: '300' }}>
                                            Are you ready to lead, inspire and
                                            coach?
                                        </h2>
                                        <h3 style={{ fontWeight: '100' }}>
                                            Please fill out the application form
                                            below if you’re ready to join the
                                            team
                                        </h3>
                                    </div>
                                    <div className="wSelect2">
                                        <label>
                                            Chosen Academy (first choice)
                                        </label>
                                        <Select
                                            value={first_academy}
                                            options={listSite}
                                            isSearchable={false}
                                            isMulti={false}
                                            getOptionLabel={(option) => {
                                                // console.log();
                                                return Utils.renderItem(option);
                                            }}
                                            getOptionValue={(option) =>
                                                option.ms_id
                                            }
                                            styles={CommonStyle.select2}
                                            onChange={(option) => {
                                                setFieldValue(
                                                    'first_academy',
                                                    option,
                                                );
                                            }}
                                        />
                                        <label className="input-error">
                                            {errors.first_academy}
                                        </label>
                                    </div>
                                    <div className="wSelect2">
                                        <label>
                                            Chosen Academy (second choice)
                                        </label>
                                        <Select
                                            value={second_academy}
                                            options={listSite}
                                            isSearchable={false}
                                            isMulti={false}
                                            getOptionLabel={(option) => {
                                                // console.log();
                                                return Utils.renderItem(option);
                                            }}
                                            getOptionValue={(option) =>
                                                option.ms_id
                                            }
                                            styles={CommonStyle.select2}
                                            onChange={(option) =>
                                                setFieldValue(
                                                    'second_academy',
                                                    option,
                                                )
                                            }
                                        />
                                        <label className="input-error">
                                            {errors.second_academy}
                                        </label>
                                    </div>
                                    <div className="wSelect2">
                                        <label>
                                            Chosen Academy (third choice)
                                        </label>
                                        <Select
                                            value={third_academy}
                                            options={listSite}
                                            isSearchable={false}
                                            isMulti={false}
                                            getOptionLabel={(option) => {
                                                // console.log();
                                                return Utils.renderItem(option);
                                            }}
                                            getOptionValue={(option) =>
                                                option.ms_id
                                            }
                                            styles={CommonStyle.select2}
                                            onChange={(option) =>
                                                setFieldValue(
                                                    'third_academy',
                                                    option,
                                                )
                                            }
                                        />
                                        <label className="input-error">
                                            {errors.third_academy}
                                        </label>
                                    </div>

                                    <h3 style={{ fontWeight: '100' }}>
                                        Personal Info
                                    </h3>

                                    <div className="wSelect2">
                                        <label>Your Name</label>
                                        <input
                                            // disabled={true}
                                            // value="abd"
                                            type="text"
                                            className="inputText"
                                            placeholder="Example name"
                                            onChange={handleChange('name')}
                                        />
                                        <label className="input-error">
                                            {errors.name}
                                        </label>
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
                                                setFieldValue(
                                                    'telephone',
                                                    event,
                                                );
                                            }}
                                        />
                                        <label className="input-error">
                                            {errors.telephone}
                                        </label>
                                    </div>

                                    <h2 style={{ fontWeight: '300' }}>
                                        Coaching Info
                                    </h2>

                                    <div className="wSelect2">
                                        <label>Do you have a valid DBS?</label>
                                        <Select
                                            value={dbs}
                                            options={[
                                                { value: 'Yes' },
                                                { value: 'No' },
                                            ]}
                                            isSearchable={false}
                                            isMulti={false}
                                            getOptionLabel={(option) =>
                                                option.value
                                            }
                                            getOptionValue={(option) =>
                                                option.value
                                            }
                                            styles={CommonStyle.select2}
                                            onChange={(option) => {
                                                setFieldValue('dbs', option);
                                            }}
                                        />
                                        <label className="input-error">
                                            {errors.dbs}
                                        </label>

                                        <h3 style={{ fontWeight: '100' }}>
                                            Coaching qualification level (tick
                                            boxes that apply)
                                        </h3>
                                        {ARRAY.map((item) => {
                                            const isChecked =
                                                qualifications.some(
                                                    (el) => el === item.label,
                                                );
                                            return (
                                                <div
                                                    key={item.id.toString()}
                                                    style={{
                                                        display: 'flex',
                                                        paddingTop: '1rem',
                                                        alignItems: 'center',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => {
                                                        if (
                                                            values.dbs?.value !=
                                                            'Yes'
                                                        )
                                                            return;
                                                        if (isChecked) {
                                                            const arr =
                                                                qualifications.filter(
                                                                    (el) =>
                                                                        el !==
                                                                        item.label,
                                                                );

                                                            setFieldValue(
                                                                'qualifications',
                                                                arr,
                                                            );
                                                        } else {
                                                            const arr = [
                                                                ...qualifications,
                                                                item.label,
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
                                        <label className="input-error">
                                            {/* {errors.qualifications} */}
                                        </label>
                                    </div>
                                    <div className="wSelect2">
                                        <label>Other Qualifications?</label>
                                        <textarea
                                            className="textArea"
                                            onChange={handleChange(
                                                'other_qualification',
                                            )}
                                        />
                                    </div>

                                    <h2 style={{ fontWeight: '300' }}>
                                        Additional Info
                                    </h2>
                                    <div className="wSelect2">
                                        <label>
                                            Why do you want to work for us?
                                        </label>
                                        <textarea
                                            className="textArea"
                                            onChange={handleChange(
                                                'additional_info',
                                            )}
                                        />
                                    </div>
                                    <div className="wSelect2">
                                        <label>
                                            What level of football have you
                                            played?
                                        </label>
                                        <h6
                                            style={{
                                                fontWeight: '100',
                                                margin: '0',
                                            }}>
                                            (Although we may need your skills
                                            for the annual coach tournament, we
                                            don't hire based on footballing
                                            ability so please be honest)*
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
                                    <AttachFileButton
                                        className="wSelect2"
                                        label="Attach CV (optional):"
                                        onChange={(obj) => {
                                            setFieldValue('file', obj);
                                        }}
                                        file={'Eg: .pdf, .doc, .rtf'}
                                    />
                                    <div className="wSelect2">
                                        <Captcha id="coaching" />
                                        <label className="input-error">
                                            {''}
                                        </label>
                                    </div>
                                    <button
                                        // type="submit"
                                        className="btn-button-s btn-submit"
                                        onClick={handleSubmit}>
                                        Submit application
                                    </button>

                                    <div>
                                        <p>
                                            For more information about our
                                            privacy practices, please read our{' '}
                                            <a href={'policies/privacy'}>
                                                Privacy Policy.
                                            </a>
                                        </p>
                                        <p>
                                            By clicking above, you agree that we
                                            may process your information in
                                            accordance with these terms.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DefaultLayout>
                );
            }}
        </Formik>
    );
}

export async function getServerSideProps() {
    const listRes = await siteService.getListSite();
    const listSite = listRes.data.data.lstSite;

    return { props: { listSite } };
}

export default Coaching;
