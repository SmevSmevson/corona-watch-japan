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
    ],
    [
      "Outside Reporting Country",
	  "",
	  "49"
    ],
    [
      "Charter",
	  "チャーター",
	  "50"
    ],
    [
      "Diamond Princess",
	  "",
	  "51"
    ],
    [
      "China",
	  "中国",
	  "52"
    ],
    [
      "investigating",
	  "investigating",
	  "53"
    ]
]
const COLORS = ['#d8a436','#ff0000','#333399','#730971','#999999']
const AGECOLORS = [
	'#2d0f41',
	'#3d1459',
    '#4d1a70',
    '#5e1f88',
    '#742796',
    '#973490',
    '#b8428c',
    '#db5087',
    '#e96a8d',
    '#ee8b97',
    '#f3aca2',
    '#f9cdac',
    '#ff2900',
    '#ff0000'
]

function BarByPrefecture() {
    const {casesData, dispatch} = useContext(CasesDataContext)
    const [showCases, setShowCases] = useState(true)
    const [showDeceased, setShowDeceased] = useState(true)
    const [showMale, setShowMale] = useState(false)
    const [showFemale, setShowFemale] = useState(false)
    const [showUndisclosed, setShowUndisclosed] = useState(false)

    const [sortBy, setSortBy] = useState('name')

    const casesByPrefecture = () => {
		let locs = locations.map(location => {
			return {
				name: location[0],
				cases: 0,
				deceased: 0,
				male: 0,
				female: 0
			}
		})
		let cases = casesData.reduce((acc, el) => {
            if (el.residence == 'China')
                return acc
            
			if (acc.find(val => val.name == el.residence)) {
                let editEl =
                    acc[acc.findIndex(val => val.name == el.residence)]
                
                editEl = {
                    name: editEl.name,
                    cases: el.case_number >= 0 ? editEl.cases++ : editEl.cases,
                    deceased:
                        el.status === 'deceased'
                            ? editEl.deceased++
                            : editEl.deceased,
                    male: el.case_number >= 0 && el.gender === 'Male' ? editEl.male++ : editEl.male,
                    female: el.gender === 'Female' ? +editEl.female++ : +editEl.female,
                    genderUndisclosed: el.gender === 'Undisclosed' ? editEl.genderUndisclosed++ : editEl.genderUndisclosed,
                }
				return acc
			}
			return acc
		}, locs)
        
        return cases.filter(c => c.cases !== 0).sort((a, b) => b[sortBy] - a[sortBy])
    }

    return (
        <div>
            <h2>Data by Prefecture</h2>
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
                        <div onClick={() => setShowMale(!showMale)}>
                            <span className="l-box" style={{backgroundColor: COLORS[2]}}></span>
                            <label htmlFor="maleInput">male: </label>
                            <input id="#maleInput" type="checkbox" defaultChecked="true" checked={showMale}/>
                        </div>
                        <div onClick={() => setShowFemale(!showFemale)}>
                            <span className="l-box" style={{backgroundColor: COLORS[3]}}></span>
                            <label htmlFor="femaleInput">female: </label>
                            <input id="#femaleInput" type="checkbox" defaultChecked="true" checked={showFemale}/>
                        </div>
                        <div onClick={() => setShowUndisclosed(!showUndisclosed)}>
                            <span className="l-box" style={{backgroundColor: COLORS[4]}}></span>
                            <label htmlFor="undisclosedInput">undisclosed: 
                            <input id="#undisclosedInput" type="checkbox" defaultChecked="true" checked={showUndisclosed}/>
                             {/* onChange={() => setShowUndisclosed(!showUndisclosed)}/> */}
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    sort
                    <select onChange={(e) => setSortBy(e.target.value)}>
                        <option value="name">location</option>
                        <option value="cases">cases</option>
                        <option value="deceased">deceased</option>
                        <optgroup label="gender">
                            <option value="male">male</option>
                            <option value="female">female</option>
                            <option value="genderUndisclosed">undisclosed</option>
                        </optgroup>
                    </select>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={(casesByPrefecture().length + 1) * 40}>
                <BarChart 
                    layout="vertical" 
                    barGap={0}
                    barCategoryGap={5} 
                    barSize={10}
                    data={casesByPrefecture()} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" strokeWidth="1" stroke="#000" />
                    <XAxis type="number" orientation="top"/>
                    <YAxis type="category" dataKey="name" width={80} />
                    <Tooltip />
                    
                    {showCases ? <Bar dataKey="cases" fill={COLORS[0]} /> : null}
                    {showDeceased ? <Bar dataKey="deceased" fill={COLORS[1]} /> : null}
                    {showMale ? <Bar dataKey="male" fill={COLORS[2]} /> : null}
                    {showFemale ? <Bar dataKey="female" fill={COLORS[3]} /> : null}
                    {showUndisclosed ? <Bar dataKey="genderUndisclosed" fill={COLORS[4]} />: null}                        
                        
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarByPrefecture;
