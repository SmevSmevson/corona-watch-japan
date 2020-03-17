import React, {useState, useEffect, useContext} from 'react'
import db from '../db'
import { MapDataContext } from '../contextProviders/MapDataContext'

const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
]

const Timeline = () => {
	let {mapData} = useContext(MapDataContext)

	let [timelineInfo, setTimelineInfo] = useState([])

	useEffect(() => {
		if(mapData.timeline)
			setTimelineInfo(mapData.timeline)
	}, [mapData])

	let getTimelineInfo = timelineInfo => {
		return timelineInfo
			.map(info => {
				return (
					<div
						className={
							info.tags[0] === 'Japan'
								? 'timeline-item'
								: 'timeline-item timeline-item--cruise'
						}
						key={info.id}
					>
						<div className="timeline-item__date">
							<span className="timeline-item__number">
								{new Date(info.date).getDate()}
							</span>
							<span className="timeline-item__month">
								{months[new Date(info.date).getMonth()]}
							</span>
						</div>
						<div className="timeline-item__summary">
							{info.heading}
						</div>
						<a
							href={info.source.link}
							className="timeline-item__source"
						>
							{info.source.display}
						</a>
						<div className="timeline-item__tags">
							{info.tags.map(tag => (
								<span className="tag" key={info.id + tag}>
									{tag}
								</span>
							))}
						</div>
					</div>
				)
			})
	}

	return <div className="timeline">{getTimelineInfo(timelineInfo)}</div>
}

export default Timeline
