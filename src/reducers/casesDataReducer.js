import db from '../db'
// import japanCases from '../assets/data/japan_cases'

export const casesDataReducer = (state, action) => {
    switch (action.type) {        

        case 'SET_CASES_DATA': {
            // action : {caseData}
            return action.caseData
        }

        case 'INIT_CASES_DATA': {
            // action : {dispatch}
            let fetchFunction = async () => {
                try {                    
                    let cases = await db.firestore().collection('cases').get()
                    action.dispatch({type: 'SET_CASES_DATA', caseData: cases.docs.map(doc => {
                            return {...doc.data()}
                        })
                    })
                } catch (error) {
                    // action.dispatch({type: 'SET_CASES_DATA', caseData: japanCases.cases})
                }
            }
    
            fetchFunction()

            return state
        }

        default:
            return state

    }
}