import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function EqualityAndDiversity() {
    return (
        <div className="container we-flare-policies">
            <Link className="btn-view-policies">View all policies</Link>
            <h1 className="heading">
            Equality and Diversity Policy
            </h1>

            <div  style={{marginBottom:"100px"}}>
                <p style={{ marginBottom: 25 }}>
                    We Make Footballers are responsible for insuring that our
                    standards and values to apply within each We Make
                    Footballers Academy at every level. By working with children
                    of all abilities from the ages of 4-12, we aim to make
                    <br />
                    football as accessible as possible to the children who
                    choose to join.
                </p>
                <p style={{ marginBottom: 25 }}>
                    The We Make Footballers Equality &amp; Diversity Policy is
                    to ensure that each child, coach and customer is treated
                    fairly and with respect within our activities.
                </p>
                <p style={{ marginBottom: 25 }}>
                    We Make Footballers are committed to encouraging equality
                    and diversity among our workforce, and eliminating unlawful
                    discrimination. We Make Footballers are committed against
                    unlawful discrimination of customers or the public. All team
                    members representing the We Make Footballers brand should
                    abide and adhere to this policy and to the requirements of
                    the Equality Act 2010. We Make Footballers work to create
                    equal opportunities for our team. Each coach shall be
                    entitled to the same levels of training and encouraged to
                    pursue continual professional development within We Make
                    Footballers
                </p>
                <p style={{ marginBottom: 25 }}>
                    We Make Footballers work to promote inclusion and to
                    confront and eliminate discrimination whether by reason of
                    age, gender, disability, race, sexualt orientation, faith or
                    belief to encourage equal opportunities.We Make Footballers
                    will not tolerate harassment, including sexual harassment,
                    bullying, abuse, discrimination or victimisation of a
                    participant.
                </p>
                <p style={{ marginBottom: 25 }}>
                    We Make Footballers work to create a positive change within
                    football and abdicate that it is a sport for all.
                </p>
            </div>
        </div>
    );
}

export default EqualityAndDiversity;
