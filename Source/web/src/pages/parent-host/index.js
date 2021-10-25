import dynamic from 'next/dynamic';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import PathRoute from 'src/common/PathRoute';
import { CommonStyle } from 'src/common/Styles';
const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));
import siteService from 'src/services/siteService';
import * as Yup from 'yup';

const AttachFileButton = dynamic(() =>
    import('src/components/AttachFileButton'),
);
const Captcha = dynamic(() => import('src/components/Captcha'));

CoachingCopy.propTypes = {
    data: PropTypes.object,
};

function CoachingCopy({ listSite }) {
    const dispatch = useDispatch();
    const history = useRouter();

    const initialValues = {
        first_academy: listSite[0],
        second_academy: listSite[0],
        third_academy: listSite[0],
        name: '',
        email: '',
        telephone: '',
        yourFeel: '',
        file: {},
    };

    const validation = {
        first_academy: Yup.object()
            .required('Please select First Academy')
            .nullable(),
        second_academy: Yup.object()
            .required('Please select Second Academy')
            .nullable(),
        third_academy: Yup.object()
            .required('Please select Third Academy')
            .nullable(),
        name: Yup.string().trim().required('Please enter your name').nullable(),
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
    };
    const validationSchema = Yup.object().shape(validation);

    async function sendForm(param) {
        try {
            const res = await siteService.sendForm(param);
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
                    log.type = 'parent-host';
                    log.first_academy = log.first_academy.ms_id;
                    log.second_academy = log.second_academy.ms_id;
                    log.third_academy = log.third_academy.ms_id;

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
                    // other_qualification,
                    // additional_info,
                    // level,
                    file,
                } = values;

                return (
                    <DefaultLayout>
                        <div className="holiday-camp">
                            <div
                                className="container"
                                style={{ marginTop: 115 }}>
                                <div className="tab-1">
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            paddingBottom: 30,
                                        }}>
                                        <h2 style={{ fontWeight: '300' }}>
                                            Help build the community one welcome
                                            at a time
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
                                            getOptionLabel={(option) =>
                                                option.ms_name
                                            }
                                            getOptionValue={(option) =>
                                                option.ms_id
                                            }
                                            styles={CommonStyle.select2}
                                            onChange={(option) =>
                                                setFieldValue(
                                                    'first_academy',
                                                    option,
                                                )
                                            }
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
                                            getOptionLabel={(option) =>
                                                option.ms_name
                                            }
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
                                            getOptionLabel={(option) =>
                                                option.ms_name
                                            }
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
                                        Tell us about you
                                    </h2>
                                    <div className="wSelect2">
                                        <label>
                                            Why do you feel you would be a great
                                            parent host with WMF?
                                        </label>
                                        <textarea
                                            className="textArea"
                                            onChange={handleChange('yourFeel')}
                                        />
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
                                        <Captcha />
                                        <label className="input-error">
                                            {''}
                                        </label>
                                    </div>
                                    <button
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

export async function getStaticProps() {
    const listRes = await siteService.getListSite();
    const listSite = listRes.data.data.lstSite;

    return { props: { listSite } };
}

export default CoachingCopy;
