import React from 'react';
import BarByPrefecture from '../components/graphs/BarByPrefecture';
import BarByAge from '../components/graphs/BarByAge';
import BarByGender from '../components/graphs/BarByGender';
import PieByGender from '../components/graphs/PieByGender';
import LineByDay from '../components/graphs/LineByDay';

function Graphs() {
    return (
        <div id="graphs">
            <BarByPrefecture />
            <BarByAge />
            <BarByGender />
            <PieByGender />
            <LineByDay />
        </div>
    )
}

export default Graphs;
