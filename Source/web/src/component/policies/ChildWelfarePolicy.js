import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ChildWelfarePolicy() {
    return (
        <div className="container we-flare-policies">
            <Link className="btn-view-policies">View all policies</Link>
            <h1 className="heading">
                Safeguard children policy and procedures
            </h1>
            
                <div className="jsn-bootstrap3 wr-element-container wr-element-text" style={{marginBottom:"100px"}}>
                    <div className="wr_text about-guide" id="muc4V4">
                        <h4>WE MAKE FOOTBALLERS SAFEGUARDING CHILDREN</h4>
                        <ol start={1}>
                            <li>
                                We Make Footballers acknowledges its
                                responsibility to safeguard the welfare of every
                                child and young person who has been entrusted to
                                its care and is committed to working to provide
                                a safe environment for all members. A child or
                                young person is anyone under the age of 18
                                engaged in any club football activity. We
                                subscribe to The Football Association’s (The FA)
                                Safeguarding Children Policy and Procedures and
                                endorse and adopt the Policy Statement contained
                                in that document.
                            </li>
                        </ol>
                        <ol start={2}>
                            <li>
                                The key principles of The FA Safeguarding
                                Children Policy are that:
                            </li>
                        </ol>
                        <ul
                            style={{
                                marginLeft: 30,
                                listStyleType: 'lower-alpha',
                            }}>
                            <li>
                                the child’s welfare is, and must always be, the
                                paramount consideration
                            </li>
                            <li>
                                all children and young people have a right to be
                                protected from abuse regardless of their age,
                                gender, disability, race, sexual orientation,
                                faith or belief
                            </li>
                            <li>
                                all suspicions and allegations of abuse will be
                                taken seriously and responded to swiftly and
                                appropriately
                            </li>
                            <li>
                                working in partnership with other organisations,
                                children and young people and their
                                parents/carers is essential.
                            </li>
                        </ul>
                        <ol start={3}>
                            <li>
                                We acknowledge that every child or young person
                                who plays or participates in football should be
                                able to take part in an enjoyable and safe
                                environment and be protected from poor practice
                                and abuse. We Make Footballers recognises that
                                this is the responsibility of every adult
                                involved in our club.
                            </li>
                        </ol>
                        <ol start={4}>
                            <li>
                                We Make Footballers has a role to play in
                                safeguarding the welfare of all children and
                                young people by protecting them from physical,
                                sexual or emotional harm and from neglect or
                                bullying. It is noted and accepted that The
                                Football Association’s Safeguarding Children
                                Regulations (see The FA Handbook) applies to
                                everyone in football whether in a paid or
                                voluntary capacity.
                            </li>
                        </ol>
                        <ol start={5}>
                            <li>
                                We endorse and adopt The FA’s Responsible
                                Recruitment guidelines for recruiting volunteers
                                and we will:
                            </li>
                        </ol>
                        <ul
                            style={{
                                marginLeft: 30,
                                listStyleType: 'lower-alpha',
                            }}>
                            <li>
                                specify what the role is and what tasks it
                                involves request identification documents as a
                                minimum meet and chat with the applicant(s) and
                                where possible interview people before
                                appointing them ask for and follow up with 2
                                references before appointing someone where
                                eligible require an FA accepted Enhanced
                                Criminal Record Check (CRC) with Barring List
                                Check in line with current FA policy and
                                regulations.
                            </li>
                        </ul>
                        <ol start={6}>
                            <li>
                                    All current We Make Footballers members
                                    working in eligible roles, with children and
                                    young people – such as academy managers,
                                    senior coaches, junior coaches, volunteers
                                    and Parent Hosts are required to hold an
                                    in-date FA accepted EnhancedDBS with Barring
                                    List check as part of responsible
                                    recruitment practice.
                            </li>
                        </ol>
                        <ol start={7}>
                            <li>
                                If there are concerns regarding the
                                appropriateness of an individual who is already
                                involved or who has approached us to become part
                                of We Make Footballers guidance will be sought
                                from The Football Association. It is noted and
                                accepted that The FA will consider the relevance
                                and significance of the information obtained via
                                the CRC Process and that all suitability
                                decisions will be made in accordance with
                                legislation and in the best interests of
                                children and young people.
                            </li>
                        </ol>
                        <ol start={8}>
                            <li>
                                    It is accepted that The FA aims to prevent
                                    people with a history of relevant and
                                    significant offending from having contact
                                    with children or young people and the
                                    opportunity to influence policies or
                                    practice with children or young people. This
                                    is to prevent direct sexual or physical harm
                                    to children and to minimise the risk of
                                    grooming within football.
                            </li>
                        </ol>
                        <ol start={9}>
                            <li>
                                We Make Footballers supports The FA’s Whistle
                                Blowing Policy. Any adult or young person with
                                concerns about a adult in a position of trust
                                with football can ‘whistle blow’ by contacting
                                The FA Safeguarding Team on 0800 169 1863, by
                                writing to The FA Case Manager at The Football
                                Association, Wembley Stadium, PO Box 1966,
                                London SW1P 9EQ, by emailing
                                Safeguarding@TheFA.com or alternatively by going
                                direct to the Police, Children’s Social Care or
                                the NSPCC. We Make Footballers encourages
                                everyone to know about The FA’s Whistle Blowing
                                Policy and to utilise it if necessary.
                            </li>
                        </ol>
                        <ol start={10}>
                            <li>
                                Each We Make Footballers franchise have
                                appointed a Club Welfare Officer in line with
                                The FA’s role profile and required completion of
                                the Safeguarding Children and Welfare Officers
                                Workshop. The post holder will be involved with
                                Welfare Officer training provided by The FA
                                and/or County FA. The Club Welfare Officer is
                                the first point of contact for all club members
                                regarding concerns about the welfare of any
                                child or young person. The Club Welfare Officer
                                will liaise directly with the County FA (CFA)
                                Welfare Officer and will be familiar with the
                                procedures for referring any concerns. They will
                                also play a proactive role in increasing
                                awareness of Respect, poor practice, and abuse
                                amongst WMF members.
                            </li>
                        </ol>
                        <ol start={11}>
                            <li>
                                We acknowledge and endorse The FA’s
                                identification of bullying as a category of
                                abuse. Bullying of any kind is not acceptable at
                                our club. If bullying does occur, all players or
                                parents/carers should be able to tell and know
                                that incidents will be dealt with promptly.
                                Incidents need to be reported to the Club
                                Welfare Officer in cases of serious bullying the
                                CFA Welfare Officer may be contacted. You can
                                read our policy on bullying here:{' '}
                                <a href="https://www.wemakefootballers.com/anti-bullying-make-footballers/">
                                    https://www.wemakefootballers.com/anti-bullying-make-footballers/
                                </a>
                            </li>
                        </ol>
                        <ol start={12}>
                            <li>
                                Respect codes of conduct for Players,
                                Parents/Spectators, and Coaches have been
                                implemented by We Make Footballers. In order to
                                validate these Respect codes of conduct, the
                                club has clear actions it will take regarding
                                repeated or serious misconduct at club level and
                                acknowledges the possibility of potential
                                sanctions which may be implemented by the County
                                FA in more serious circumstances.
                            </li>
                        </ol>
                        <ol start={13}>
                            <li>
                                Reporting your concerns about the welfare of a
                                child or young person. Safeguarding is
                                everyone’s responsibility if you are worried
                                about a child it is important that you report
                                your concerns no action is not an option.
                            </li>
                        </ol>
                        <li style={{ marginLeft: 30 }}>
                            i. If you are worried about a child then you need to
                            report your concerns to the Club Welfare Officer.
                        </li>
                        <li style={{ marginLeft: 30 }}>
                            ii. If the issue is one of poor practice the Club
                            Welfare Officer will either:
                        </li>
                        <ul
                            style={{
                                marginLeft: 30,
                                listStyleType: 'lower-alpha',
                            }}>
                            <li>
                                If you are worried about a child then you need
                                to report your concerns to the Club Welfare
                                Officer.
                            </li>
                            <li>
                                If the issue is one of poor practice the Club
                                Welfare Officer will either:
                            </li>
                            <ul
                                style={{
                                    marginLeft: 30,
                                    padding: 0,
                                    listStyleType: 'upper-roman',
                                }}>
                                <li>deal with the matter themselves or</li>
                                <li>
                                    seek advice from the CFA Welfare Officer
                                </li>
                            </ul>
                            <li>
                                If the concern is more serious i.e. possible
                                child abuse, where possible, contact the CFA
                                Welfare Officer first, then immediately contact
                                the Police or Children’s Social Care.
                            </li>
                            <li>
                                If the child needs immediate medical treatment
                                take them to a hospital or call an ambulance and
                                tell them this is a child protection concern.
                                Let your Club Welfare Officer know what action
                                you have taken, they in turn will inform the CFA
                                Welfare Officer.
                            </li>
                            <li>
                                {' '}
                                If at any time you are not able to contact your
                                Club Welfare Officer or the matter is clearly
                                serious then you can either:
                            </li>
                            <ul
                                style={{
                                    marginLeft: 30,
                                    padding: 0,
                                    listStyleType: 'upper-roman',
                                }}>
                                <li>
                                    contact your{' '}
                                    <strong>CFA Welfare Officer</strong>{' '}
                                    directly
                                </li>
                                <li>
                                    contact{' '}
                                    <strong>The FA Safeguarding Team</strong> on{' '}
                                    <strong>0800 169 1863</strong> or{' '}
                                    <strong>Safeguarding@TheFA.com</strong>
                                </li>
                                <li>
                                    contact the <strong>Police</strong> or{' '}
                                    <strong>Children’s Social Care</strong>
                                </li>
                                <li>
                                    call the{' '}
                                    <strong>NSPCC 24 hour Helpline</strong> for
                                    advice on <strong>0808 800 5000</strong> or
                                    text<strong> 88858</strong> or email
                                    <strong> help@nspcc.org.uk</strong>
                                </li>
                            </ul>
                        </ul>
                        <ol start={14}>
                            <li>
                                The FA’s Safeguarding Children Policy and
                                Procedures are available via
                                www.TheFA.com/football-rules-governance/safeguarding
                                click on Raising Awareness Best Practice
                                Downloads, the Policy and Procedures document is
                                within the resources area. The policy outlines
                                in detail what to do if you are concerned about
                                the welfare of a child and includes flow
                                diagrams which describe this process. How to
                                make a referral is also covered in the
                                Safeguarding Children workshop. Participants are
                                given the opportunity to discuss how this feels
                                and how best they can prepare themselves to deal
                                with such a situation. For more information on
                                this workshop contact your County Welfare
                                Officer.
                            </li>
                        </ol>
                        <ol start={15}>
                            <li>
                                Further advice on Safeguarding Children matters
                                can be obtained from:
                            </li>
                        </ol>
                        <ul
                            style={{
                                marginLeft: 30,
                                listStyleType: 'lower-alpha',
                            }}>
                            <li>info@wemakefootballers.com</li>
                            <li>
                                www.TheFA.com/football-rules-governance/safeguarding
                            </li>
                            <li>Emailing: Safeguarding@TheFA.com</li>
                            <li>
                                The FA Safeguarding Children general enquiry
                                line 0845 210 8080
                            </li>
                            <li>
                                TheFA.com/football-rules-governance/safeguarding
                            </li>
                        </ul>
                        <ol start={16}>
                            <li>Safeguarding Children Policy and Procedures</li>
                        </ol>
                        <ul
                            style={{
                                marginLeft: 30,
                                listStyleType: 'lower-alpha',
                            }}>
                            <li>
                                The FA’s policy on Disclosure and Barring
                                Service CRCs is subject to change. CRC
                                information and guidance can be found at{' '}
                                <a
                                    href="http://www.thefa.com/football-rules-governance/safeguarding/criminal-records-checks"
                                    className="external"
                                    rel="nofollow">
                                    www.TheFA.com/football-rules-governance/safeguarding/criminal-records-checks
                                </a>
                            </li>
                        </ul>
                        <p>
                            <strong
                                style={{
                                    fontSize: 22,
                                    marginTop: 20,
                                    display: 'block',
                                }}>
                                Let’s make football safe not sorry
                            </strong>
                        </p>
                        <hr />
                        <h3 style={{ textAlign: 'center' }}>
                            <strong>UPDATE 1/12/16</strong>
                        </h3>
                        <li>
                            We understand that the recent revelations from
                            former players of professional clubs will have
                            raised a lot of questions in parents minds about the
                            safety of youth football. We are appalled by the
                            horrific abuse that has been suffered by former
                            footballers and applaud their immense courage and
                            bravery in coming forward.
                        </li>
                        <li>
                            Here at We Make Footballers we put the welfare of
                            your children at the center of everything we do.
                            Sean Conlon our CEO is also our Child Welfare
                            Officer (CWO) and was recently on ITV news giving
                            his opinion on the emerging news and the role of the
                            FA in current best practice.
                        </li>
                        <li>
                            One of the main areas of strength within our
                            Safeguarding is our ‘Safer Recruitment’ processes.
                            This means we adopt a best practice system for
                            recruiting coaches into the We Make Footballers
                            family. All prospective staff are put through a
                            minimum of two interviews, one face to face and one
                            practical or field based, both with two members of
                            staff present. References are gathered from most
                            recent employers and a full Disclosure and Barring
                            Service check is undertaken before the staff member
                            comes into contact with any young people. All staff
                            must have the relevant FA qualifications and must
                            have up to date FA First Aid and FA Safeguarding
                            qualifications.
                        </li>
                    </div>
                </div>
            </div>
    );
}

export default ChildWelfarePolicy;
