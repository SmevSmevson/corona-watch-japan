import React from 'react';
import {Link} from 'react-router-dom'

function HeaderLinks() {
    return (
        <ul className="header__links-list">
            <li>
                <Link to={'/'}>home</Link>
            </li>
            <li>
                <Link to={'/edit-map-data'}>edit map</Link>
            </li>
            <li>
                <Link to={'/edit-timeline-data'}>add to timeline</Link>
            </li>
            <li>
                <Link to={'/edit-timeline-data'}>logout</Link>
            </li>
        </ul>
    )
}

export default HeaderLinks;
