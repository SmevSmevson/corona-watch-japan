import db from '../db'

export const mapDataReducer = (state, action) => {
    switch (action.type) {
        //mutations
        case 'SET_MAP_DATA': {
            // action : {prefectureData}
            // console.log('SET_MAP_DATA',state, action)

            let totalCases = action.prefectureData
            .filter(({name}) => name != 'Japan' && name != 'Diamond Princess')
            .reduce((acc, {infected_count}) => acc + infected_count, 0)

            let totalDeaths = action.prefectureData
            .filter(({name}) => name != 'Japan' && name != 'Diamond Princess')
            .reduce((acc, {deaths}) => acc + +deaths, 0)

            return {...state, prefectureData: action.prefectureData, totals: {cases: totalCases, deaths: totalDeaths}}
        }
        case 'SET_MAP_UPDATED': {
            // console.log('SET_MAP_UPDATED', state, action)
            return {...state, updated: action.updated.date}
        }
        case 'SET_TIMELINE': {
            // console.log('SET_TIMELINE', state, action)
            return {...state, timeline: action.timeline}
        }

        //async actions
        case 'INIT_MAP_DATA': {
            // action : {dispatch}
            let fetchFunction = async () => {
                let prefecture_cases = await db.firestore().collection('prefecture_cases').get()
                action.dispatch({type: 'SET_MAP_DATA', prefectureData: prefecture_cases.docs.map(doc => {
                        return { id: doc.id, ...doc.data()}
                    })
                })
                let updated = await db.firestore().collection('map_updated').get()
                action.dispatch({type: 'SET_MAP_UPDATED', updated: updated.docs.map(doc => {
                        return doc.data()
                    })[0]
                })
                let timeline = await db.firestore().collection('timeline').orderBy("date", "desc").get()
                action.dispatch({type: 'SET_TIMELINE', timeline: timeline.docs.map(doc => {
                        return { id: doc.id, ...doc.data()}
                    })
                })
            }
    
            fetchFunction()

            return state
        }
        
        default:
            return state
    }
}