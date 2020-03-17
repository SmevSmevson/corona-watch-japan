import React, {useState} from 'react';
import db from '../db'

function EditCaseData() {
    const [submitState, setSubmitState] = useState('IDLE')
    const [jsonData, setJsonData] = useState('')

    let addToDB = (e) => {
        e.preventDefault()
        if(submitState === 'IDLE') {
            setSubmitState('BUSY')

            let parsedData = JSON.parse(`{ "cases": [${jsonData}]}`)
            console.log(parsedData)

            Promise.all(
                parsedData.cases.map(c => {
                    return db.firestore().collection('cases').doc(`${c.case_number}`).set(c)
                })
            ).then((res) => {
                setJsonData('')
                setSubmitState('SUCCESS')
                setTimeout(() => {
                    setSubmitState('IDLE')
                }, 1000);
            }).catch((err) => {
                setSubmitState('ERROR')
                setTimeout(() => {
                    setSubmitState('IDLE')
                }, 1000);
            })
        }
    }

    return (
        <section className="form-section">
        <form onSubmit={addToDB}>
            <label htmlFor="JSON-data">JSON objects</label>
            <textarea type="JSON" id="JSON-data" value={jsonData} onChange={(e) => setJsonData(e.target.value)}/>
            <span></span>

            <button type="submit" className={`button--submit button--submit__${submitState}`}>
                {
                    submitState === "IDLE" ? 'Submit': 
                    submitState === "BUSY" ? 'Submitting': 
                    submitState === "SUCCESS" ? 'Success': 
                    'Failed'
                }
            </button>
        </form>
    </section>
    )
}

export default EditCaseData;
