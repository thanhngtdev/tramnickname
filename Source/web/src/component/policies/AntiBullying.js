import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function AntiBullying() {
    return (
        <div className="container we-flare-policies">
            <Link className="btn-view-policies">View all policies</Link>
            <h2 className="heading">ANTI BULLYING POLICY</h2>

            <div className="entry-content" id="entry-content" style={{marginBottom:"100px"}}>
                <div className="jsn-bootstrap3 container">
                    <div
                        id="RAhC13"
                        className="row "
                        style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingLeft: 10,
                            paddingRight: 10,
                        }}>
                        <div className="wmf-col col-md-16 col-sm-16 col-xs-16 ">
                            <div
                                className="jsn-bootstrap3 wr-element-container wr-element-heading"
                                style={{ marginTop: 5, marginBottom: 25 }}>
                                <h3 style={{}}>Statement of Intent</h3>
                            </div>
                            <div className="jsn-bootstrap3 wr-element-container wr-element-text">
                                <div className="wr_text" id="dWOfeG">
                                    <p>
                                        <span style={{ fontWeight: 400 }}>
                                            We are committed to providing a
                                            caring, friendly and safe
                                            environment for all of our staff,
                                            players and their families so they
                                            can participate in football in a
                                            relaxed and secure atmosphere.
                                            Bullying of any kind is
                                            unacceptable. If bullying does
                                            occur, all staff, players and their
                                            families should be able to report
                                            and know that the incident/s will be
                                            dealt with promptly and effectively.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="jsn-bootstrap3 container">
                    <div
                        className="row "
                        style={{
                            padding:"40px",
                            backgroundColor:"#e6e6e6"
                        }}>
                        <div className="wmf-col col-md-16 col-sm-16 col-xs-16 ">
                            <div
                                className="jsn-bootstrap3 wr-element-container wr-element-heading"
                                style={{ marginTop: 5, marginBottom: 25 }}>
                                <h3 style={{}}>What is bullying?</h3>
                            </div>
                            <div className="jsn-bootstrap3 wr-element-container wr-element-text">
                                <div className="wr_text">
                                    <p>
                                        <span style={{ fontWeight: 400 }}>
                                            Bullying is the use of aggression
                                            with the intention of hurting
                                            another person. Bullying results in
                                            pain and distress to the victim.
                                            Bullying can be:{' '}
                                        </span>
                                    </p>
                                    <ul>
                                        <li>
                                            <span style={{ fontWeight: 400 }}>
                                                {' '}
                                                Emotional – being unfriendly,
                                                excluding (emotionally and
                                                physically) sending hurtful text
                                                messages, tormenting, (e.g.
                                                hiding football boots/shin
                                                guards, threatening gestures){' '}
                                            </span>
                                        </li>
                                        <li>
                                            <span style={{ fontWeight: 400 }}>
                                                {' '}
                                                Physical pushing, kicking,
                                                hitting, punching or any use of
                                                violence{' '}
                                            </span>
                                        </li>
                                        <li>
                                            <span style={{ fontWeight: 400 }}>
                                                {' '}
                                                Racist – racial taunts,
                                                graffiti, gestures{' '}
                                            </span>
                                        </li>
                                        <li>
                                            <span style={{ fontWeight: 400 }}>
                                                {' '}
                                                Sexist – because of, or
                                                focussing on the issue of sex or
                                                gender of an individual
                                            </span>
                                        </li>
                                        <li>
                                            <span style={{ fontWeight: 400 }}>
                                                {' '}
                                                Sexual – unwanted physical
                                                contact or sexually abusive
                                                comments
                                            </span>
                                        </li>
                                        <li>
                                            <span style={{ fontWeight: 400 }}>
                                                {' '}
                                                Homophobic – because of, or
                                                focussing on the issue of
                                                sexuality
                                            </span>
                                        </li>
                                        <li>
                                            <span style={{ fontWeight: 400 }}>
                                                {' '}
                                                Verbal – name-calling, sarcasm,
                                                spreading rumours, teasing
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="jsn-bootstrap3 container">
                    <div
                        className="row "
                        style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingLeft: 10,
                            paddingRight: 10,
                        }}>
                        <div className="wmf-col col-md-16 col-sm-16 col-xs-16 ">
                            <div
                                className="jsn-bootstrap3 wr-element-container wr-element-heading"
                                style={{ marginTop: 5, marginBottom: 25 }}>
                                <h3 style={{}}>
                                    Why is it important to respond to bullying?
                                </h3>
                            </div>
                            <div className="jsn-bootstrap3 wr-element-container wr-element-text">
                                <div className="wr_text">
                                    <p>
                                        <span style={{ fontWeight: 400 }}>
                                            Bullying hurts. No one deserves to
                                            be a victim of bullying. Everybody
                                            has the right to be treated with
                                            respect. Individuals who are
                                            bullying need to learn different
                                            ways of behaving. The impact upon a
                                            child or young person can be
                                            devastating and in some cases affect
                                            all aspects of their life, in
                                            extreme circumstances it can lead to
                                            suicide threats or even attempts. At
                                            We Make Footballers our aim is to
                                            make GREAT footballers who can both
                                            play well but also have the right
                                            attitude – this policy sits as a
                                            cornerstone of this.{' '}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="jsn-bootstrap3 container">
                    <div
                        id="voSCAn"
                        className="row "
                        style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingLeft: 10,
                            paddingRight: 10,
                        }}>
                        <div className="wmf-col col-md-16 col-sm-16 col-xs-16 ">
                            <div
                                className="jsn-bootstrap3 wr-element-container wr-element-heading"
                                style={{ marginTop: 5, marginBottom: 25 }}>
                                <h3 style={{}}>Objectives of this policy</h3>
                            </div>
                            <div className="jsn-bootstrap3 wr-element-container wr-element-text">
                                <div className="wr_text" id="ukGm9i">
                                    <ul>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                All staff, coaches, volunteers,
                                                parent hosts and parents/carers
                                                should have an understanding of
                                                what bullying is{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                All staff, coaches, volunteers
                                                and parent hosts should know
                                                what the WMF policy is on
                                                bullying, and follow it when
                                                bullying is reported{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                All players and parents/carers
                                                should know what the WMF policy
                                                is on bullying, and what they
                                                should do if bullying arises{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                As WMF we take bullying
                                                seriously
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                Players and parents/carers
                                                should be assured that they
                                                would be supported when bullying
                                                is reported{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                Bullying will not be tolerated
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                This policy must be adhered to
                                                by the owner of a franchise, the
                                                academy managers the coaches,
                                                volunteers, parents hosts,
                                                players and all their supporters{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                Failure to follow this policy
                                                will lead to disciplinary action
                                                such as, a franchise being
                                                revoked, being passed through
                                                the disciplinary process (gross
                                                misconduct), being asked to stop
                                                playing.
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="jsn-bootstrap3 container">
                    <div
                        id="UujlsU"
                        className="row "
                        style={{
                            padding:"40px",
                            backgroundColor:"#e6e6e6"
                        }}>
                        <div className="wmf-col col-md-16 col-sm-16 col-xs-16 ">
                            <div
                                className="jsn-bootstrap3 wr-element-container wr-element-heading"
                                style={{ marginTop: 5, marginBottom: 25 }}>
                                <h3 style={{}}>Signs and Indicators</h3>
                            </div>
                            <div className="jsn-bootstrap3 wr-element-container wr-element-text">
                                <div className="wr_text" id="1h8qi8">
                                    <p>
                                        <span style={{ fontWeight: 400 }}>
                                            A child may indicate by signs or
                                            behaviour that he or she is being
                                            bullied. Adults should be aware of
                                            these possible signs and that they
                                            should investigate if a child:
                                        </span>
                                    </p>
                                    <ul>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                says he or she is being bullied
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                is unwilling to go to training
                                                sessions{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                becomes withdrawn anxious, or
                                                lacking in confidence{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                feels ill before training
                                                sessions{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                comes home with clothes torn or
                                                training equipment damaged{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                has possessions go ‘missing’{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                asks for money or starts
                                                stealing money (to pay the
                                                bully){' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                has unexplained cuts or bruises{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                is frightened to say what’s
                                                wrong{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                gives improbable excuses for any
                                                of the above.
                                            </span>
                                        </li>
                                    </ul>
                                    <p>
                                        <span style={{ fontWeight: 400 }}>
                                            In more extreme cases:
                                        </span>
                                    </p>
                                    <ul>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                starts stammering{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                cries themselves to sleep at
                                                night or has nightmares{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                becomes aggressive, disruptive
                                                or unreasonable{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                is bullying other children or
                                                siblings{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                stops eating{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                attempts or threatens suicide or
                                                runs away
                                            </span>
                                        </li>
                                    </ul>
                                    <p>
                                        <span style={{ fontWeight: 400 }}>
                                            These signs and behaviours may
                                            indicate other problems, but
                                            bullying should be considered a
                                            possibility and should be
                                            investigated.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="jsn-bootstrap3 container">
                    <div
                        id="7fC8wy"
                        className="row "
                        style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingLeft: 10,
                            paddingRight: 10,
                        }}>
                        <div className="wmf-col col-md-16 col-sm-16 col-xs-16 ">
                            <div
                                className="jsn-bootstrap3 wr-element-container wr-element-heading"
                                style={{ marginTop: 5, marginBottom: 25 }}>
                                <h3 style={{}}>Procedures</h3>
                            </div>
                            <div className="jsn-bootstrap3 wr-element-container wr-element-text">
                                <div className="wr_text" id="gV5JKA">
                                    <ul>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                Report bullying incidents to the
                                                We make Footballers WFO or a
                                                senior member of staff
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                In cases of serious bullying,
                                                the incidents will be referred
                                                to the CPO/Police for advice{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                Parents should be informed and
                                                will be asked to come in to a
                                                meeting to discuss the problem{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                If necessary and appropriate,
                                                the Police will be consulted{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                The bullying behaviour or
                                                threats of bullying must be
                                                investigated and the bullying
                                                stopped quickly{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                An attempt will be made to help
                                                the bully (bullies) change their
                                                behaviour{' '}
                                            </span>
                                        </li>
                                        <li style={{ fontWeight: 400 }}>
                                            <span style={{ fontWeight: 400 }}>
                                                {' '}
                                                If mediation fails and the
                                                bullying is seen to continue WMF
                                                will initiate disciplinary
                                                action
                                            </span>
                                        </li>
                                    </ul>
                                    <p>
                                        <span style={{ fontWeight: 400 }}>
                                            In the rare case of an adult
                                            reported to be bullying anyone
                                            within WMF under 18 please call Sean
                                            Conlon on 02071481602 immediately.
                                            He will agree to meet with all
                                            parties and the police will be
                                            contacted if required.{' '}
                                        </span>
                                    </p>
                                    <p>
                                        <span style={{ fontWeight: 400 }}>
                                            If any adult is feeling bullied
                                            within the organisation then they
                                            must contact Sean Conlon immediately
                                            who will agree to meet with them and
                                            mediate between parties.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AntiBullying;
