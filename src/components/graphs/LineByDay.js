import React, { useState, useContext } from 'react';
import {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Brush, Bar, PieChart, Pie, Cell, LineChart, Line} from 'recharts'
import { CasesDataContext } from '../../contextProviders/CasesDataContext'

const locations = [
    [
      "Japan",
	  "日本",
	  "00"
    ],
    [
      "Hokkaido",
	  "北海道",
	  "01"
    ],
    [
      "Aomori",
	  "青森県",
	  "02"
    ],
    [
      "Iwate",
	  "岩手県",
	  "03"
    ],
    [
      "Miyagi",
	  "宮城県",
	  "04"
    ],
    [
      "Akita",
	  "秋田県",
	  "05"
    ],
    [
      "Yamagata",
	  "山形県",
	  "06"
    ],
    [
      "Fukushima",
	  "福島県",
	  "07"
    ],
    [
      "Ibaraki",
	  "茨城県",
	  "08"
    ],
    [
      "Tochigi",
	  "栃木県",
	  "09"
    ],
    [
      "Gunma",
	  "群馬県",
	  "10"
    ],
    [
      "Saitama",
	  "埼玉県",
	  "11"
    ],
    [
      "Chiba",
	  "千葉県",
	  "12"
    ],
    [
      "Tokyo",
	  "東京都",
	  "13"
    ],
    [
      "Kanagawa",
	  "神奈川県",
	  "14"
    ],
    [
      "Niigata",
	  "新潟県",
	  "15"
    ],
    [
      "Toyama",
	  "富山県",
	  "16"
    ],
    [
      "Ishikawa",
	  "石川県",
	  "17"
    ],
    [
      "Fukui",
	  "福井県",
	  "18"
    ],
    [
      "Yamanashi",
	  "山梨県",
	  "19"
    ],
    [
      "Nagano",
	  "長野県",
	  "20"
    ],
    [
      "Gifu",
	  "岐阜県",
	  "21"
    ],
    [
      "Shizuoka",
	  "静岡県",
	  "22"
    ],
    [
      "Aichi",
	  "愛知県",
	  "23"
    ],
    [
      "Mie",
	  "三重県",
	  "24"
    ],
    [
      "Shiga",
	  "滋賀県",
	  "25"
    ],
    [
      "Kyoto",
	  "京都府",
	  "26"
    ],
    [
      "Osaka",
	  "大阪府",
	  "27"
    ],
    [
      "Hyogo",
	  "兵庫県",
	  "28"
    ],
    [
      "Nara",
	  "奈良県",
	  "29"
    ],
    [
      "Wakayama",
	  "和歌山県",
	  "30"
    ],
    [
      "Tottori",
	  "鳥取県",
	  "31"
    ],
    [
      "Shimane",
	  "島根県",
	  "32"
    ],
    [
      "Okayama",
	  "岡山県",
	  "33"
    ],
    [
      "Hiroshima",
	  "広島県",
	  "34"
    ],
    [
      "Yamaguchi",
	  "山口県",
	  "35"
    ],
    [
      "Tokushima",
	  "徳島県",
	  "36"
    ],
    [
      "Kagawa",
	  "香川県",
	  "37"
    ],
    [
      "Ehime",
	  "愛媛県",
	  "38"
    ],
    [
      "Kochi",
	  "高知県",
	  "39"
    ],
    [
      "Fukuoka",
	  "福岡県",
	  "40"
    ],
    [
      "Saga",
	  "佐賀県",
	  "41"
    ],
    [
      "Nagasaki",
	  "長崎県",
	  "42"
    ],
    [
      "Kumamoto",
	  "熊本県",
	  "43"
    ],
    [
      "Oita",
	  "大分県",
	  "44"
    ],
    [
      "Miyazaki",
	  "宮崎県",
	  "45"
    ],
    [
      "Kagoshima",
	  "鹿児島県",
	  "46"
    ],
    [
      "Okinawa",
	  "沖縄県",
	  "47"
    ],
    [
      "Undisclosed",
	  "非公開",
	  "48"
    ]
]
const COLORS = ['#d8a436','#ff0000']

function BarByGender() {
    const {casesData, dispatch} = useContext(CasesDataContext)
    const [showCases, setShowCases] = useState(true)
    const [showDeceased, setShowDeceased] = useState(true)

    const [accumulate, setAccumulate] = useState(false)
    const [filterBy, setFilterBy] = useState('Japan')

    const casesByDay = () => {
        let dates = casesData.reduce((acc, el) => {
            if(!acc.find(val => val.date == el.date)) {
                acc.push({ 
                    date: el.date, 
                    count: 0,
                    deceased: 0
                })
            }

			if (acc.find(val => val.date == el.date)) {
                let editEl =
                    acc[acc.findIndex(val => val.date == el.date)]
                el.case_number >= 0 && (filterBy === 'Japan' || el.residence === filterBy)?
                editEl.count += 1 : 
                editEl.count += 0 
                el.status === 'deceased' && (filterBy === 'Japan' || el.residence === filterBy)?
                editEl.deceased += 1 : 
                editEl.deceased += 0 
                return acc
            }
			return acc
		}, [])
        
        // console.log(dates.sort((a, b) => new Date(b.date) - new Date(a.date)))
        return dates.sort((a, b) => new Date(a.date) - new Date(b.date))//:cases.filter(c => c.deceased !== 0)
    }

    const casesByDayAcc = () => {
        let cByD = casesByDay()
        return cByD.map((el, i, cByD) => {
            if(cByD[i-1]) {
                el.count += cByD[i-1].count
                el.deceased += cByD[i-1].deceased
            }

            return el
        })
    }

    return (
        <div>
            <h2>New Cases by Day</h2>
            <div>
                <div>
                    show
                    <div className="chart-toggles">
                        <div onClick={() => setShowCases(!showCases)}>
                            <span className="l-box" style={{backgroundColor: COLORS[0]}}></span>
                            <label htmlFor="casesInput">cases: </label>
                            <input id="#casesInput" type="checkbox" defaultChecked="true" checked={showCases}/>
                        </div>
                        <div onClick={() => setShowDeceased(!showDeceased)}>
                            <span className="l-box" style={{backgroundColor: COLORS[1]}}></span>
                            <label htmlFor="deceasedInput">deceased: </label>
                            <input id="#deceasedInput" type="checkbox" defaultChecked="true" checked={showDeceased}/>
                        </div>
                    </div>
                    <div onClick={() => setAccumulate(!accumulate)}>
                        <label htmlFor="accumulateInput">accumulate: </label>
                        <input id="#accumulateInput" type="checkbox" defaultChecked="false" checked={accumulate}/>
                    </div>
                </div>
                <div>
                    filter
                    <select onChange={(e) => setFilterBy(e.target.value)}>
                        {locations.map(l => <option key={l[0]} value={l[0]}>{l[0]} / {l[1]}</option>)}
                    </select>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={500}>
                <LineChart data={accumulate? casesByDayAcc() : casesByDay()}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#000" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    {showCases ? <Line type="monotone" dataKey="count" stroke={COLORS[0]} animationDuration={600} animationEasing="ease-out"/> : null}
                    {showDeceased? <Line type="monotone" dataKey="deceased" stroke={COLORS[1]} animationDuration={600} animationEasing="ease-out"/> : null}
                    <Brush />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarByGender;
