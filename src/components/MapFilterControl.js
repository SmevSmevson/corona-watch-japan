import React, {useState, useEffect} from 'react'

let startDate = new Date('2020/1/14')
let endDate = new Date(Date.now())

const DaysBetween = (StartDate, EndDate) => {
	// The number of milliseconds in all UTC days (no DST)
	const oneDay = 1000 * 60 * 60 * 24;
  
	// A day in UTC always lasts 24 hours (unlike in other time formats)
	const start = Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate());
	const end = Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate());
  
	// so it's safe to divide by 24 hours
	return (start - end) / oneDay;
}

const MapFilterControl = (props) => {
	let {dateType, currDate, setDateFunc} = props
	let daysSinceFirstCase = DaysBetween(startDate, endDate)
	let dayOptions = []
	const [select, setSelect] = useState(currDate)

	for (let index = 0; index <= daysSinceFirstCase; index++) {
		let nextDate = new Date(startDate)
		nextDate.setDate(startDate.getDate() + index)
		dayOptions.push(
			<option 
				key={`${nextDate.getFullYear()}/${nextDate.getMonth() + 1}/${+nextDate.getDate()}`}
				value={`${nextDate.getFullYear()}/${nextDate.getMonth() + 1}/${+nextDate.getDate()}`}
			>
				{nextDate.getMonth() + 1}/{+nextDate.getDate()}
			</option>
		)
	}

	let minusDate = (e) => {
		let val = new Date(select)
		val.setDate(val.getDate() - 1)
		if(val >= startDate)
			setSelect(`${val.getFullYear()}/${val.getMonth() + 1}/${+val.getDate()}`)
	}

	let plusDate = (e) => {
		let val = new Date(select)
		val.setDate(val.getDate() + 1)
		if(val <= endDate)
			setSelect(`${val.getFullYear()}/${val.getMonth() + 1}/${+val.getDate()}`)
	}
	
	useEffect(() => {
		setDateFunc(select)
	}, [select, setDateFunc]);

	return (
		<div className="lable-group">
			<label htmlFor={dateType}>{dateType} date:</label>
			<div className="input-group">
				<button onClick={minusDate}>&minus;</button>
				<select 
					id={dateType} 
					onChange={(e) => {setSelect(e.target.value)}}
					value={select}
				>
					{dayOptions.map(option => option)}
				</select>
				<button onClick={plusDate}>&#43;</button>
			</div>
		</div>
	)
}

export default MapFilterControl
