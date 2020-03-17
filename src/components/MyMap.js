import React, {useState, useEffect, useContext} from 'react'
import {Map, GeoJSON, ZoomControl} from 'react-leaflet'
import prefecturesSimple from '../assets/data/jp_prefs_simple.json'
import MapFilterControl from './MapFilterControl'
import { CasesDataContext } from '../contextProviders/CasesDataContext'

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

const dateNow = new Date(Date.now())

const MyMap = () => {
	let state = {
		lat: 38.2048,
		lng: 137.2529,
		zoom: 5,
	}
	let {casesData} = useContext(CasesDataContext)
	let [shownInfo, setShownInfo] = useState({})
	let [dateFrom, setDateFrom] = useState('2020/1/14')
	let [dateTo, setDateTo] = useState(`${dateNow.getFullYear()}/${dateNow.getMonth() + 1}/${dateNow.getDate()}`)
	let [prefectureCases, setPrefectureCases] = useState([])
	
	let getTotalCases = () => {
		return prefectureCases.reduce((acc, el) => {
			return acc += +el.cases
		}, 0)
	}

	let getTotalDeaths = () => {
		return prefectureCases.reduce((acc, el) => {
			return acc += +el.deceased
		}, 0)
	}

	let getPrefectureData = () => {
		let locs = locations.map(location => {
			return {name: location[0], name_jp: location[1], code: location[2], cases: 0, deceased: 0}
		})
		let cases = casesData.reduce((acc, el) => {
			if (acc.find(val => val.name == el.residence)) {
				if (
					new Date(el.date) >= new Date(dateFrom) &&
					new Date(el.date) <= new Date(dateTo)
				) {
					let editEl =
						acc[acc.findIndex(val => val.name == el.residence)]
					editEl = {
						code: editEl.code,
						name: editEl.residence,
						name_jp: editEl.name_jp,
						cases: el.case_number >= 0 ? editEl.cases++ : editEl.cases,
						deceased:
							el.status === 'deceased'
								? editEl.deceased++
								: editEl.deceased,
					}
				}
				return acc
			}
			return acc
		}, locs)

		let prefData = locs.map(loc => {
			if(cases.find(val => val.code == loc.code))
				return cases.find(val => val.code == loc.code)

			return loc
		})

		setPrefectureCases(prefData)
	}

	// useEffect(() => {
	// 	getPrefectureData()
	// 	setShownInfo(defaultShownInfo())
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])

	useEffect(() => {
		setShownInfo(defaultShownInfo())
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [prefectureCases])

	useEffect(() => {
		getPrefectureData()
		setShownInfo(defaultShownInfo())
		// setShownInfo(defaultShownInfo())
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dateFrom, dateTo])

	useEffect(() => {
		if(Object.keys(casesData).length > 0){
			getPrefectureData()
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [casesData])


	let defaultShownInfo = () => {
		return {
			name: 'Japan',
			name_jp: '日本',
			cases: getTotalCases(),
			deceased: getTotalDeaths()
		}
	} 

	let showPrefectureInfo = e => {
		let filteredCases = prefectureCases
			.filter(
				prefectureInfo =>
					prefectureInfo.code == e.layer.feature.properties.CODE,
			)
			.map(({name, name_jp, cases, deceased}) => {
				return {name, name_jp, cases, deceased}
			})
		setShownInfo(
			filteredCases.length
				? filteredCases[0]
				: {
						location: 'Japan',
						...filteredCases[0],
				  },
		)
	}

	let getFillColor = d => {
		return d > 0 ? '#371010' : '#372610'
	}

	let getStrokeColor = d => {
		return d > 0 ? '#9f1919' : '#a8662c'
	}

	let getHoverEffect = d => {
		return d > 0 ? 'red' : 'orange'
	}

	let style = feature => {
		let filteredCases = prefectureCases
			.filter(
				prefectureInfo => prefectureInfo.code == feature.properties.CODE,
			)
			.map(({cases}) => {
				return cases
			})
		return {
			fillColor: getFillColor(filteredCases[0]),
			color: getStrokeColor(filteredCases[0]),
			strokeOpacity: '1',
			weight: '1',
			strokeLinecap: 'round',
			strokeLinejoin: 'round',
			fill: '#000',
			fillOpacity: '1',
			fillRule: 'evenodd',
			className: `hover-effect ${getHoverEffect(filteredCases[0])}`,
		}
	}

	return casesData.length > 0 ? (
		<>
		<div className="map-section">
			<Map
				center={[state.lat, state.lng]}
				zoom={state.zoom}
				zoomControl={false}
				className="map"
			>
				<GeoJSON
					data={prefecturesSimple}
					style={style}
					onMouseOver={showPrefectureInfo}
					onClick={showPrefectureInfo}
					onMouseOut={() => setShownInfo(defaultShownInfo)}
				/>
				<ZoomControl position={'bottomright'} />
			</Map>
			<div className="info-card">
				<div>
					{shownInfo.name} {shownInfo.name_jp}
				</div>
				<div>
					confirmed cases: <span>{shownInfo.cases}</span>
				</div>
				<div>
					deaths: <span>{shownInfo.deceased}</span>
				</div>
			</div>
			{/* <div className="update">
				updated:{' '}
				{new Date(mapData && mapData.updated)
					.toString()
					.replace('GMT+0900 (Japan Standard Time)', '')}
			</div> */}
		</div>
		<div className="map-controls">
			<MapFilterControl dateType="start" currDate={dateFrom} setDateFunc={setDateFrom} />
			<MapFilterControl dateType="end" currDate={dateTo} setDateFunc={setDateTo} />
		</div>
		</>
	) : <div className="map-loading"><span className="map-loading__text">loading...</span></div>
}

export default MyMap
