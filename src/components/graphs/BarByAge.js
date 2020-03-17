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
const COLORS = ['#d8a436','#ff0000','#333399','#730971','#999999']

function BarByAge() {
    const {casesData, dispatch} = useContext(CasesDataContext)
    const [showCases, setShowCases] = useState(true)
    const [showDeceased, setShowDeceased] = useState(true)

    const [sortBy, setSortBy] = useState('name')
    const [filterBy, setFilterBy] = useState('Japan')

    const casesByAge = () => {
		let cases = casesData.reduce((acc, el) => {

            if (!acc.find(val => val.age == el.age)) {
                //add key for age
                acc.push({ 
                    age: el.age, 
                    count: 0,
                    deceased: 0
                })
            }
			if (acc.find(val => val.age == el.age)) {
                // add +1 to the age group
                let editEl = acc[acc.findIndex(val => val.age == el.age)]
                el.case_number >= 0 && (filterBy === 'Japan' || el.residence === filterBy)?
                editEl.count += 1 : 
                editEl.count += 0 
                el.status === 'deceased' && (filterBy === 'Japan' || el.residence === filterBy)?
                editEl.deceased += 1 : 
                editEl.deceased += 0 
                return acc
            }
			return acc
        }, [
            {age: "90", count: 0, deceased: 0},
            {age: "80", count: 0, deceased: 0},
            {age: "70", count: 0, deceased: 0},
            {age: "60", count: 0, deceased: 0},
            {age: "50", count: 0, deceased: 0},
            {age: "40", count: 0, deceased: 0},
            {age: "30", count: 0, deceased: 0},
            {age: "20", count: 0, deceased: 0},
            {age: "10", count: 0, deceased: 0},
            {age: "Under 10", count: 0, deceased: 0},
            {age: "Undisclosed", count: 0, deceased: 0},
        ])
                
        return cases.sort((a, b) => b[sortBy] - a[sortBy])
    }

    return (
        <div>
            <h2>Data by Age</h2>
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
                </div>

                <div>
                    sort
                    <select onChange={(e) => setSortBy(e.target.value)}>
                        <option value="age">age</option>
                        <option value="count">cases</option>
                        <option value="deceased">deaths</option>
                    </select>
                </div>
                <div>
                    filter
                    <select onChange={(e) => setFilterBy(e.target.value)}>
                        {locations.map(l => <option key={l[0]} value={l[0]}>{l[0]} / {l[1]}</option>)}
                    </select>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={(Object.keys(casesByAge()).length + 1) * 40}>
                <BarChart 
                    layout="vertical" 
                    barGap={0}
                    barCategoryGap={5} 
                    barSize={10}
                    data={casesByAge()} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" strokeWidth="1" stroke="#000" />
                    <XAxis type="number" allowDecimals={false}/>
                    <YAxis type="category" dataKey="age" width={80} />
                    <Tooltip />
                    {showCases ? <Bar dataKey="count" fill={COLORS[0]} /> : null}
                    {showDeceased ? <Bar dataKey="deceased" fill={COLORS[1]} /> : null}
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarByAge;
