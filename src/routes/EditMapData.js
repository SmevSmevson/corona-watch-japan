import React, {useState, useContext} from 'react'
import {firestore} from 'firebase'
import db from '../db'
import { MapDataContext } from '../contextProviders/MapDataContext'
import { AuthContext } from '../contextProviders/AuthContext'
import { Redirect } from 'react-router-dom'

const locations = [
    [
      "Japan",
      "日本"
    ],
    [
      "Hokkaido",
      "北海道"
    ],
    [
      "Aomori",
      "青森県"
    ],
    [
      "Iwate",
      "岩手県"
    ],
    [
      "Miyagi",
      "宮城県"
    ],
    [
      "Akita",
      "秋田県"
    ],
    [
      "Yamagata",
      "山形県"
    ],
    [
      "Fukushima",
      "福島県"
    ],
    [
      "Ibaraki",
      "茨城県"
    ],
    [
      "Tochigi",
      "栃木県"
    ],
    [
      "Gunma",
      "群馬県"
    ],
    [
      "Saitama",
      "埼玉県"
    ],
    [
      "Chiba",
      "千葉県"
    ],
    [
      "Tokyo",
      "東京都"
    ],
    [
      "Kanagawa",
      "神奈川県"
    ],
    [
      "Niigata",
      "新潟県"
    ],
    [
      "Toyama",
      "富山県"
    ],
    [
      "Ishikawa",
      "石川県"
    ],
    [
      "Fukui",
      "福井県"
    ],
    [
      "Yamanashi",
      "山梨県"
    ],
    [
      "Nagano",
      "長野県"
    ],
    [
      "Gifu",
      "岐阜県"
    ],
    [
      "Shizuoka",
      "静岡県"
    ],
    [
      "Aichi",
      "愛知県"
    ],
    [
      "Mie",
      "三重県"
    ],
    [
      "Shiga",
      "滋賀県"
    ],
    [
      "Kyoto",
      "京都府"
    ],
    [
      "Osaka",
      "大阪府"
    ],
    [
      "Hyogo",
      "兵庫県"
    ],
    [
      "Nara",
      "奈良県"
    ],
    [
      "Wakayama",
      "和歌山県"
    ],
    [
      "Tottori",
      "鳥取県"
    ],
    [
      "Shimane",
      "島根県"
    ],
    [
      "Okayama",
      "岡山県"
    ],
    [
      "Hiroshima",
      "広島県"
    ],
    [
      "Yamaguchi",
      "山口県"
    ],
    [
      "Tokushima",
      "徳島県"
    ],
    [
      "Kagawa",
      "香川県"
    ],
    [
      "Ehime",
      "愛媛県"
    ],
    [
      "Kochi",
      "高知県"
    ],
    [
      "Fukuoka",
      "福岡県"
    ],
    [
      "Saga",
      "佐賀県"
    ],
    [
      "Nagasaki",
      "長崎県"
    ],
    [
      "Kumamoto",
      "熊本県"
    ],
    [
      "Oita",
      "大分県"
    ],
    [
      "Miyazaki",
      "宮崎県"
    ],
    [
      "Kagoshima",
      "鹿児島県"
    ],
    [
      "Okinawa",
      "沖縄県"
    ],
    [
      "Undisclosed",
      "非公開"
    ],
    [
      "Outside Reporting Country",
      ""
    ],
    [
      "Charter",
      "チャーター"
    ],
    [
      "Diamond Princess",
      ""
    ]
  ]

const Edit = () => {
    let {auth} = useContext(AuthContext)
    let {mapData, dispatch} = useContext(MapDataContext)
    const [currentPrefectureData, setCurrentPrefectureData] = useState({})
    const [name, setName] = useState('')
    const [newInfected, setNewInfected] = useState(0)
    const [deaths, setDeaths] = useState(0)
    const [submitState, setSubmitState] = useState('IDLE')

    let editPrefecture = (e) => {
        e.preventDefault()
        if(submitState === 'IDLE') {
            setSubmitState('BUSY')
            db.firestore().collection('prefecture_cases').doc(name).update({
                infected_count: firestore.FieldValue.increment(+newInfected),
                new: newInfected,
                deaths: firestore.FieldValue.increment(+deaths)
            }).then(res => {
                db.firestore().collection('map_updated').doc('Date').update({
                    date: new Date(Date.now()).toISOString(),
                })
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

    let getPrefectureData = (e) => {
        setCurrentPrefectureData(
            mapData.prefectureData.filter(el => el.name == e)[0]
        )
    }

    if (!auth.user) return <Redirect to="/"/>
    return (

        <section className="form-section">
            <form onSubmit={editPrefecture}>
                <label htmlFor="name">location</label>
                <select name="locations" id="locations" onChange={(e) => {setName(e.target.value); getPrefectureData(e.target.value)}}>
                    {locations.map(location => <option value={location[0]} key={location[0]}>{location[0]}/ {location[1]}</option>)}
                </select>
                <span></span>

                <div style={{visibility: currentPrefectureData.name ? 'visible': 'hidden'}}>current cases</div>
                <div style={{visibility: currentPrefectureData.name ? 'visible': 'hidden'}}>{currentPrefectureData.infected_count} => {currentPrefectureData.infected_count + +newInfected}</div>
                <label htmlFor="newInfected">new infections</label>
                <input type="number" id="newInfected" value={newInfected} onChange={(e) => setNewInfected(e.target.value)}/>
                <span></span>

                <div style={{visibility: currentPrefectureData.name ? 'visible': 'hidden'}}>current deaths</div>
                <div style={{visibility: currentPrefectureData.name ? 'visible': 'hidden'}}>{currentPrefectureData.deaths} => {currentPrefectureData.deaths + +deaths}</div>
                <label htmlFor="deaths">new deaths</label>
                <input type="number" id="deaths" value={deaths} onChange={(e) => setDeaths(e.target.value)}/>
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

