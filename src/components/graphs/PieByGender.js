import React, { useState, useContext } from 'react';
import {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Brush, Bar, PieChart, Pie, Cell, LineChart, Line, Label} from 'recharts'
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
const COLORS = {
  Male: '#333399',
  Female:'#730971',
  Undisclosed: '#333'
}

const RADIAN = Math.PI / 180; 
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.15;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);
    const radius2 = innerRadius + (outerRadius - innerRadius) * .2;
    const x2  = cx + radius2 * Math.cos(-midAngle * RADIAN);
    const y2 = cy  + radius2 * Math.sin(-midAngle * RADIAN);

    return (
		<>
        <text x={x} y={y} fill="#d8a436" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
			{`${name}: ${value}`}
        </text>
        <text x={x2} y={y2} fill="#d8a436" textAnchor={x2 > cx ? 'start' : 'end'} dominantBaseline="central">
			{`(${(percent * 100).toFixed(0)}%)`}
        </text>
		</>
    );
};

function BarByGender() {
    const {casesData, dispatch} = useContext(CasesDataContext)
    const [filterBy, setFilterBy] = useState('Japan')

    const casesByGender = () => {
        let cases = casesData.reduce((acc, el) => {

			if (acc.find(val => val.gender == el.gender)) {
                // add +1 to the age group
                let editEl =
                    acc[acc.findIndex(val => val.gender == el.gender)]
                el.case_number >= 0 && (filterBy === 'Japan' || el.residence === filterBy)?
                editEl.count += 1 : 
                editEl.count += 0 
                el.status === 'deceased' && (filterBy === 'Japan' || el.residence === filterBy)?
                editEl.deceased += 1 : 
                editEl.deceased += 0 
                return acc
            } else {
                //add key for age group and +1
                acc.push({ 
                    gender: el.gender, 
                    count: el.case_number >= 0 ? 1 : 0
                })
            }
			return acc
		}, [
            {gender: 'Male', count: 0, deceased: 0}, 
            {gender: 'Female', count: 0, deceased: 0}, 
            {gender: 'Undisclosed', count: 0, deceased: 0}, 
        ])
        
        return cases.filter(c => c.count != 0).sort((a, b) => b.gender - a.gender)
    }

    return (
        <div>
            <div>
                <div>
                    filter
                    <select onChange={(e) => setFilterBy(e.target.value)}>
                        {locations.map(l => <option key={l[0]} value={l[0]}>{l[0]} / {l[1]}</option>)}
                    </select>
                </div>
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginBottom: 10}}>
				<ResponsiveContainer width={400} aspect={1}>
					<PieChart margin={{ top: 20, right: 30, left: 20, bottom: 0 }} >
						<Pie data={casesByGender()} startAngle={90} endAngle={450} dataKey='count' nameKey="gender" label={renderCustomizedLabel} labelLine={false} cx="50%" cy="50%" innerRadius="30%" outerRadius="55%" fill="#8884d8" stroke="#d9a336" animationDuration={600} animationEasing="ease-out">
							<Label value="Cases" offset={0} position="center" fill="#d8a436"/>
							{
								casesByGender().map((entry, index) => <Cell key={entry} fill={COLORS[entry.gender]}/>)
							}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
				<ResponsiveContainer width={400} aspect={1}>
					<PieChart margin={{ top: 0, right: 30, left: 20, bottom: 5 }} >
						<Pie data={casesByGender()} startAngle={90} endAngle={450} dataKey="deceased" nameKey="gender" label={renderCustomizedLabel} labelLine={false} cx="50%" cy="50%" innerRadius="30%" outerRadius="55%" fill="#8884d8" stroke="#d9a336" animationDuration={600} animationEasing="ease-out">
							<Label value="Deceased" offset={0} position="center" fill="#dd3333"/>
							{
								casesByGender().map((entry, index) => <Cell key={entry} fill={COLORS[entry.gender]}/>)
							}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
            </div>
        </div>
    )
}

export default BarByGender;
