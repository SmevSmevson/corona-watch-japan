import React from 'react';
import {Link} from 'react-router-dom'

function PageLinks() {
    return (
        <ul className="header__links-list">
            <li>
                <Link to={'/'}>Map</Link>
            </li>
            <li>
                <Link to={'/cases'}>Cases</Link>
            </li>
            <li>
                <Link to={'/graphs'}>Graphs</Link>
            </li>
            <li>
                <Link to={'/about'}>About</Link>
            </li>
        </ul>
    )
}

export default PageLinks;
