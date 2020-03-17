import React, { useState, useContext, useEffect } from 'react';
import { CasesDataContext } from '../contextProviders/CasesDataContext'

function Cases() {
    let {casesData} = useContext(CasesDataContext)
    const [fData, setfData] = useState([])

    useEffect(() => {
        setfData(casesData.sort((a, b) => b.case_number - a.case_number))
    }, [casesData]);
    
    return (
        <div id="cases">
            <table>
                <thead className="table-head">
                    <tr>
                        <td>case number</td>
                        <td>age</td>
                        <td>gender</td>
                        <td>residence</td>
                        <td>date</td>
                        <td>contact</td>
                        <td>source</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        fData.map(patient => {
                            return (
                                <tr key={patient.case_number} className={patient.status === 'deceased'? 'red' : 'orange'}>
                                    <td>{patient.case_number}</td>
                                    <td>{patient.age}s</td>
                                    <td>{patient.gender}</td>
                                    <td>{patient.residence}</td>
                                    <td>{patient.date}</td>
                                    <td>{patient.contact}</td>
                                    <td>{patient.source}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="note">
                <p>negative cases are deaths that are from an unknown previous case</p>
            </div>
        </div>
    )
}

export default Cases;
