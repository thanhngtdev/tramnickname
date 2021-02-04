import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
    return (
        <div className="container we-flare-policies">
            <Link className="btn-view-policies">View all policies</Link>
            <h1 className="heading">PRIVACY POLICY</h1>

            <div style={{marginBottom:"100px"}}>
                <h3>
                    <b>Protecting your data on our website</b>
                </h3>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        Last updated: 3rd May 2018
                    </span>
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        We Make Footballers® Ltd, Registration number 07752847,
                        is registered, and trades at Willoughby House, 439
                        Richmond Road, Twickenham, TW1 2AG. We know that you
                        care how information about you is stored, used and
                        shared and we appreciate your trust in us to do that
                        carefully and sensibly. This notice describes our means
                        of storing your data, using your data, and protecting
                        your data. Our privacy policy forms part of, and should
                        be read in conjunction with, our website terms and
                        conditions (“
                    </span>
                    <b>Website Terms</b>
                    <span style={{ fontWeight: 400 }}>”).</span>
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        By accepting our Website Terms, visiting
                        wemakefootballers.com (“
                    </span>
                    <b>website</b>
                    <span style={{ fontWeight: 400 }}>
                        ”) registering to use our services via our website our
                        booking software Parent Area (“
                    </span>
                    <b>booking software</b>
                    <span style={{ fontWeight: 400 }}>
                        ”), or signing up to our email newsletters (“
                    </span>
                    <b>newsletters</b>
                    <span style={{ fontWeight: 400 }}>
                        ”), you are accepting and consenting to us processing
                        your personal data in accordance with our Privacy and
                        Cookie Policies. You may withdraw such consent at any
                        time by letting us know at info@wemakefootballers.com.
                    </span>
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        The Website, and booking software is brought to you by
                        We Make Footballers® Ltd. We Make Footballers® Ltd
                        believes it is important to protect your Personal Data
                        (as defined in the EU General Data Protection Regulation
                        2016/679 (GDPR) and the Data Protection Act 1998) and we
                        are committed to giving you a personalised service that
                        meets your needs in a way that also protects your data
                        and privacy. This requires us to collect personal data
                        from you. However, we want to put you in control of that
                        personal data. We want you to be aware at all times
                        where and how your personal data is being used. This is
                        of paramount importance to us.
                    </span>
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        This policy will explain:
                    </span>
                </p>
                <ul>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            What data we may collect about you
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            How we collect your personal data
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            What we do with your data
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            Where we store your data
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            How we keep your data secure
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            Whether we share your data anywhere else
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            The cookies we use and how you can reject these
                            cookies
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            Your rights in relation to your data
                        </span>
                    </li>
                </ul>
                <p>&nbsp;</p>
                <h1>
                    <b>THE DATA WE MAY COLLECT</b>
                </h1>
                <h3>
                    <b>INFORMATION YOU VOLUNTARILY PROVIDE</b>
                </h3>
                <ul>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            If you contact us (by phone, email or through the
                            Website) with an enquiry or in response to any
                            communication from us, we may keep a record of that
                            correspondence for{' '}
                        </span>
                        three years
                        <span style={{ fontWeight: 400 }}>
                            {' '}
                            in case we need to contact you in relation to the
                            issue for which you contacted us, for operational
                            performance improvement and/or nuisance caller
                            management. We will not use it for marketing
                            purposes.
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            When you register to use our service or product, via
                            the Website or Booking Software, in which case this
                            may include your contact details, your child’s name,
                            date of birth, and medical details, how you will pay
                            for the product or service and your bank details.
                        </span>
                    </li>
                </ul>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        We may also collect data from documents that are
                        available to the public, such as the electoral register.
                    </span>
                </p>
                <p>&nbsp;</p>
                <h3>
                    <b>INFORMATION WE COLLECT ABOUT YOUR DEVICE</b>
                </h3>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        When you use the Website, Booking Software, Newsletters
                        and interact with our Services, we may use technology
                        such as that provided by Google Analytics and Active
                        Campaign to collect information about your visit to our
                        Website, Booking Software, and use of our Newsletters.
                        In essence, these tools enable us to analyse how you and
                        others interact with our Website, Booking Software, and
                        Newsletters. The information we collect may include:
                    </span>
                </p>
                <ul>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            your IP address;
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            the type of browser you use (e.g. are you using the
                            Chrome or Safari browser?);
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            the number of sessions per browser on each device;
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            the type of device (e.g. Apple) and operating system
                            (e.g. iOS) you are using;
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>timezone;</span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            if you opened our newsletters;
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            user preferences;
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            actions performed on our website; and
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            which pages you visited.
                        </span>
                    </li>
                </ul>
                <p>&nbsp;</p>
                <h1>
                    <b>WHAT WE DO WITH YOUR DATA</b>
                </h1>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        Personal Data about our customers is an important part
                        of our business and we shall only use your Personal Data
                        for the following purposes, and shall not keep such
                        Personal Data longer than is necessary to fulfill these
                        purposes:
                    </span>
                </p>
                <ul>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            To help us to identify you when you contact us.
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            To help us to identify accounts, services and/or
                            products which you could have from us, or selected
                            partners, from time to time. We may do this by
                            automatic means using a scoring system, which uses
                            the Personal Data you have provided and/or any
                            information we hold about you and Personal Data from
                            third party agencies (including credit reference
                            agencies).
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            To help us to administer and to contact you about
                            improved administration of any accounts, services,
                            and products we provide.
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            To allow us to carry out marketing analysis and
                            customer profiling (including with transactional
                            information), conduct research, including creating
                            statistical and testing information.
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            To help to prevent and detect fraud or loss.
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            To provide you with marketing information about
                            products and services, offered by the academy you
                            receive our products or service from, We Make
                            Footballers LTD, and selected partners, unless you
                            have previously asked us not to do so.
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        Toprovide you with educational training emails, for each
                        of the weeks you are subscribed to us.
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        To communicate with you about your use of our services
                        via WhatsApp
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            We may monitor and record communications with you
                            (including phone conversations and emails) for
                            quality assurance and compliance.
                        </span>
                    </li>
                </ul>
                <p>&nbsp;</p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        Where you give us Personal Data on behalf of someone
                        else, you confirm that you have provided them with the
                        information set out in this Privacy Policy and that they
                        have not objected to such use of their Personal Data.
                    </span>
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        In connection with any transaction which we enter into
                        with you:
                    </span>
                </p>
                <ul>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            We, and other companies in our group, may carry out
                            credit and fraud prevention checks with one or more
                            licensed credit reference and fraud prevention
                            agencies. We, and they, may keep a record of the
                            search. Information held about you by these agencies
                            may be linked to records relating to other people
                            living at the same address with whom you are
                            financially linked. These records will also be taken
                            into account in credit and fraud prevention checks.
                            Information from your application and payment
                            details of your account will be recorded with one or
                            more of these agencies and may be shared with other
                            organisations to help make credit and insurance
                            decisions about you and members of your household
                            with whom you are financially linked and for debt
                            collection and fraud prevention. This includes those
                            who have moved house and who have missed payments.
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            If you provide false or inaccurate information to us
                            and we suspect fraud, we will record this and may
                            share it with other people and organisations. We,
                            and other credit and insurance organisations, may
                            also use technology to detect and prevent fraud.
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            If you need details of those credit agencies and
                            fraud prevention agencies from which we obtain and
                            with which we record information about you, please
                            write to our Data Protection Manager at We Make
                            Footballers® Ltd, Willoughby House, 439 Richmond
                            Road, Twickenham, TW1 2AG.
                        </span>
                    </li>
                </ul>
                <p>&nbsp;</p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        You have the opportunity to withhold or withdraw your
                        consent for the use of your personal data for purposes
                        other than those listed above.
                    </span>
                </p>
                <p>&nbsp;</p>
                <h1>
                    <b>WHERE WE STORE YOUR DATA</b>
                </h1>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        We may store your information, when required, physically
                        and electronically.{' '}
                    </span>
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>Physical Data:</span>
                </p>
                <ul>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            Your data may be stored physically in the forms of
                            registers and mandate forms.
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            We do not store your data physically without your
                            knowledge.
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            If we obtain your data physically, it will be
                            destroyed after{' '}
                        </span>
                        two weeks
                        <span style={{ fontWeight: 400 }}>
                            , or earlier at your request. We may occasionally
                            request proof of identity before we disclose
                            personal data to you.
                        </span>
                    </li>
                </ul>
                <p>
                    <span style={{ fontWeight: 400 }}>Electronic Data:</span>
                </p>
                <ul>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            Your personal data will be stored in our Booking
                            Software and Active Campaign.
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        You contact information (name and phone number) will be
                        stored onour WhatsApp mobile phone.
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            We destroy any personal data we have of you, in our
                            Booking Software and Active Campaign,{' '}
                        </span>
                        5 years
                        <span style={{ fontWeight: 400 }}>
                            {' '}
                            after your final use of our product or service.
                            WhatsApp conversations will be deleted after the
                            conversations have ended.
                        </span>
                    </li>
                </ul>
                <p>&nbsp;</p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        Some of our services and/or products require us to
                        create an electronic spreadsheet with the personal data
                        you provide through one of our third parties. This
                        information is stored so we can gain a better
                        understanding of you as the customer, and offer you a
                        better user experience when using our service and/or
                        product. We may keep the spreadsheet for{' '}
                    </span>
                    two months
                    <span style={{ fontWeight: 400 }}>
                        {' '}
                        after you have used our service and/or product. Your
                        information can be deleted at your request.
                    </span>
                </p>
                <p>&nbsp;</p>
                <h1>
                    <b>WHERE WE SHARE YOUR DATA</b>
                </h1>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        We may allow other people and organisations to use
                        Personal data we hold about you in the following
                        circumstances:
                    </span>
                </p>
                <ul>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            If we, or substantially all of our assets, are
                            acquired or are in the process of being acquired by
                            a third party, in which case Personal data held by
                            us, about our customers, will be one of the
                            transferred assets.
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            If we are under a duty to disclose or share your
                            personal data in order to comply with any legal or
                            regulatory obligation or request.
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            We employ companies and individuals to perform
                            functions on our behalf, and we may disclose your
                            Personal Data to these parties to carry out our
                            purposes stated in the{' '}
                        </span>
                        <b>What We Do With Your Data</b>
                        <span style={{ fontWeight: 400 }}>
                            {' '}
                            section, or, for example, for fulfilling orders,
                            delivering packages, sending postal mail and email,
                            removing repetitive information from customer lists,
                            analysing data, providing marketing assistance,
                            providing search results and links (including paid
                            listings and links) and providing customer service.
                            Those parties are bound by strict contractual
                            provisions with us and only have access to Personal
                            data needed to perform their functions, and may not
                            use it for other purposes.{' '}
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            From time to time, the information that we collect
                            from you may be processed outside the European
                            Economic Area (EEA), but we have ensured that there
                            is an adequate level of protection for such
                            information.
                        </span>
                    </li>
                </ul>
                <h3>
                    <b>WHO WE SHARE YOUR INFORMATION WITH</b>
                </h3>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        Your Personal Data is disclosed to our employees, on “a
                        need to know” basis and we confirm that all such persons
                        understand the importance of client confidentiality and
                        privacy.
                    </span>
                    <span style={{ fontWeight: 400 }}>
                        <br />
                    </span>
                    <span style={{ fontWeight: 400 }}>
                        <br />
                    </span>
                    <span style={{ fontWeight: 400 }}>
                        Your Personal Data may be used to contact you, to
                        perform the fulfillment or payment of any bookings made
                        by you via our Booking Software.
                    </span>
                </p>
                <p>&nbsp;</p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        Below is a non-exhaustive list of third parties we work
                        with. We may work with third parties not listed below or
                        stop working with the third parties listed below.
                    </span>
                </p>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <b>Name</b>
                            </td>
                            <td style={{paddingLeft:"20px"}}>
                                <b>Why we work with them</b>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span style={{ fontWeight: 400 }}>
                                    Google Analytics
                                </span>
                            </td>
                            <td style={{paddingLeft:"20px"}}>
                                <span style={{ fontWeight: 400 }}>
                                    To monitor Website performance and user
                                    experience.
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span style={{ fontWeight: 400 }}>
                                    Google Apps
                                </span>
                            </td>
                            <td style={{paddingLeft:"20px"}}>
                                <span style={{ fontWeight: 400 }}>
                                    To process emails, create spreadsheets and
                                    word documents
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span style={{ fontWeight: 400 }}>
                                    Active Campaign
                                </span>
                            </td>
                            <td style={{paddingLeft:"20px"}}>
                                <span style={{ fontWeight: 400 }}>
                                    To monitor your sales journey with us and to
                                    provide you with our Newsletters and improve
                                    the user experience.
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span style={{ fontWeight: 400 }}>
                                    Eventbrite
                                </span>
                            </td>
                            <td style={{paddingLeft:"20px"}}>
                                <span style={{ fontWeight: 400 }}>
                                    To manage bookings for our services and/or
                                    products
                                </span>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <span style={{ fontWeight: 400 }}>
                                    WhatsApp
                                </span>
                            </td>
                            <td style={{paddingLeft:"20px"}}>
                                <span style={{ fontWeight: 400 }}>
                                    To send texts and communicate with you about
                                    your use of our services/products
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <h1>
                    <b>HOW WE KEEP YOUR DATA SAFE</b>
                </h1>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        We do not store credit card details nor do we share
                        customer details with any third parties, apart from the
                        parties listed in the table above. We have strict
                        security measures to protect Personal Data.
                    </span>
                </p>
                <ul>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            We will not disclose your Personal Data to any third
                            party except in accordance with this Privacy Policy.
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            We work to protect the security of your information
                            during transmission by using Secure Sockets Layer
                            (SSL) software, which encrypts information you
                            input.
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        <span style={{ fontWeight: 400 }}>
                            We reveal only the last five digits of your credit
                            card numbers when confirming an order. Of course, we
                            transmit the entire credit card number to the
                            appropriate credit card company during order
                            processing.
                        </span>
                    </li>
                    <li style={{ fontWeight: 400 }}>
                        WhatsApp messages are encrypted, so any information you
                        share with us will not be read by others.
                    </li>
                </ul>
                <p>&nbsp;</p>
                <h1>
                    <b>COOKIES AND PIXELS</b>
                </h1>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        ‘Cookies’ are small pieces of data that are stored on
                        your computer, mobile phone or other devices, to
                        recognise your browser and record how you have used a
                        website. Pixels are small blocks of code on web pages or
                        emails that do things like allow another server to
                        measure viewing of a web page or email and are often
                        used in connection with cookies.
                    </span>
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        We may use cookies to monitor how people use our site.
                        This helps us to understand how our customers and
                        potential customers use our website so we can develop
                        and improve the design, layout, and function of the
                        sites.{' '}
                    </span>
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        You can normally alter the settings of your browser to
                        prevent it from accepting cookies. If you do not want us
                        to use cookies in your browser, you can set your browser
                        to reject cookies or to tell you when a website tries to
                        put a cookie on your computer. However, you may not be
                        able to use some of the products or services on our
                        website without cookies.
                    </span>
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        Please refer to your device’s help material to learn
                        what controls you can use to remove or block cookies.
                        Your device may have third-party add-ons that can add,
                        disable or delete cookies. We are not responsible for
                        these third-party add-ons, or the cookies they may place
                        in your browser.
                    </span>
                </p>
                <p>&nbsp;</p>
                <h1>
                    <b>THIRD PARTY ADVERTISING</b>
                </h1>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        The Website may include third-party advertising and
                        links to other websites. We do not provide any
                        personally identifiable customer Personal Data to these
                        advertisers or third-party websites.
                    </span>
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        These third-party websites and advertisers, or Internet
                        advertising companies working on their behalf, sometimes
                        use technology to send (or “serve”) the advertisements
                        that appear on the Website directly to your browser.
                        They automatically receive your IP address when this
                        happens. They may also use cookies, JavaScript, web
                        beacons (also known as action tags or single-pixel
                        gifs), and other technologies to measure the
                        effectiveness of their ads and to personalise
                        advertising content. We do not have access to or control
                        over cookies or other features that they may use, and
                        the information practices of these advertisers and
                        third-party websites are not covered by this Privacy
                        Policy. Please contact them directly for more
                        information about their privacy practices. In addition,
                        the Network Advertising Initiative offers useful
                        information about Internet advertising companies (also
                        called “ad networks” or “network advertisers”),
                        including information about how to opt-out of their
                        information collection.
                    </span>
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        We are not responsible for loss that you may incur when
                        using these third party websites.
                    </span>
                </p>
                <p>&nbsp;</p>
                <h1>
                    <b>YOUR RIGHTS</b>
                </h1>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        It is important to us that you are able to control your
                        personal information.
                    </span>
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        You have the right to ask us not to process your
                        personal information for marketing purposes, with the
                        exception of customer communication such as welcome
                        emails, weekly training guides, service and/or product
                        feedback, registration reminders, booking confirmation
                        and the like. You can exercise your right to prevent
                        such processing at any time by contacting us at
                        info@wemakefootballers.com.
                    </span>
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        You can ask us for a copy of this Privacy Policy, and of
                        any amended Policy, by writing to We Make Footballers
                        LTD, Willoughby House, 439 Richmond Road, Twickenham,
                        TW1 2AG or by emailing us at info@wemakefootballers.com.
                        This Privacy Policy applies to the handling and
                        management of Personal Data we hold about individuals.
                        It does not apply to information we hold about companies
                        and other organisations.
                    </span>
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        You have the right to obtain a copy of the Personal Data
                        that we hold about you. You can do this by emailing us
                        at info@wemakefootballers.com or writing to the above
                        postal address. There may be a nominal charge of £10 to
                        cover administrative costs.
                    </span>
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        We aim to keep the Personal Data we hold about you
                        accurate and up to date. If you tell us that we are
                        holding any inaccurate Personal Data about you, we will
                        delete it or correct it promptly. Please email us at
                        info@wemakefootballers.com, or write to us at the postal
                        address above, to update your Personal Data.
                    </span>
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        If you want to stop using the Website, Booking Software,
                        Newsletters and our Services, you may do so. If you do,
                        you may also want to remove any cookies that we have
                        placed on any device used to access the Website, Booking
                        Software, Newsletters and our Services.
                    </span>
                </p>
                <p>&nbsp;</p>
                <h1>
                    <b>CONSENT</b>
                </h1>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        By using the Website, Booking Software, and our
                        Services, you consent to us using your Personal Data for
                        the purposes explained and set out in this Privacy
                        Policy.
                    </span>
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        Your consent is required for us to send you marketing
                        communication. If you choose to remove your consent at a
                        later time, you can do so anytime by clicking
                        ‘unsubscribe’ at the bottom of the marketing email or
                        emailing info@wemakefootballers.com
                    </span>
                </p>
                <p>&nbsp;</p>
                <h1>
                    <b>CHANGES TO OUR POLICY</b>
                </h1>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        We reserve the right to change this policy at any time
                        without notice, in which case, we will publish the
                        amended version on this page. Where appropriate, we will
                        notify you by email or Newsletter. You confirm that we
                        shall not be liable to you or any third party for any
                        change made to this Privacy Policy from time to time. It
                        is your responsibility to check regularly to determine
                        whether this Privacy Policy has changed.
                    </span>
                </p>
                <p>&nbsp;</p>
                <h1>
                    <b>COMPLAINTS</b>
                </h1>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        If You wish to make a complaint about the Website,
                        Booking Software, our Services, or any associated
                        matter, you may contact us by telephone, email, or
                        letter. Wherever possible, complaints will be dealt with
                        promptly, and you will receive a response under 30
                        working days.
                    </span>
                </p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <h1>
                    <b>CONTACTING US</b>
                </h1>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        If you would like any more information or you have any
                        comments about our Privacy Policy, please either write
                        to us at Data Protection Manager, We Make Footballers®
                        Ltd, Willoughby House, 439 Richmond Road, Twickenham,
                        TW1 2AG, or email us at info@wemakefootballers.com.
                    </span>
                </p>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
