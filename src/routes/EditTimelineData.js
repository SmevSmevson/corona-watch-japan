import React, {useState, useContext} from 'react'
import { AuthContext } from '../contextProviders/AuthContext'
import { Redirect } from 'react-router-dom'
import db from '../db'

const Edit = () => {
    let {auth} = useContext(AuthContext)
    const [submitState, setSubmitState] = useState('IDLE')
    const [heading, setHeading] = useState('')
    const [sourceName, setSourceName] = useState('')
    const [sourceLink, setSourceLink] = useState('')
    const [tags, setTags] = useState('')

    let setDefaultStates = () => {
        setHeading('')
        setSourceName('')
        setSourceLink('')
        setTags('')
    }

    let editPrefecture = (e) => {
        e.preventDefault()
        if(submitState === 'IDLE') {
            setSubmitState('BUSY')
            console.log(new Date(Date.now()).toISOString())
            console.log(heading, sourceName, sourceLink, tags)
            console.log(tags.split(','))
            db.firestore().collection('timeline').add({
                date: new Date(Date.now()).toISOString(),
                heading: heading,
                source: {
                    display: sourceName,
                    link: sourceLink
                },
                tags: tags.split(',')
            }).then(res => {
                setDefaultStates()
                setSubmitState('SUCCESS')
                setTimeout(() => {
                    setSubmitState('IDLE')
                }, 1000);
            }).catch(err => {
                setSubmitState('ERROR')
                setTimeout(() => {
                    setSubmitState('IDLE')
                }, 1000);
            })
        }
    }

    if (!auth.user) return <Redirect to="/"/>
    return (
        <section className="form-section">
            <form onSubmit={editPrefecture}>
                <label htmlFor="heading">heading</label>
                <input type="text" id="heading" value={heading} onChange={(e) => setHeading(e.target.value)}/>
                <span></span>
                <label htmlFor="sourceName">source display name</label>
                <input type="text" id="sourceName" value={sourceName} onChange={(e) => setSourceName(e.target.value)}/>
                <span></span>
                <label htmlFor="heading">source link</label>
                <input type="text" id="heading" value={sourceLink} onChange={(e) => setSourceLink(e.target.value)}/>
                <span></span>
                <label htmlFor="heading">tags</label>
                <input type="text" id="heading" value={tags} onChange={(e) => setTags(e.target.value)}/>
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

export default Edit;

