import db from '../db'

//think like vue state and mutations
export const authReducer = (state, action) => {
    switch (action.type) {
        //mutations
        case 'LOGIN_SUCCESS': {
            // action : {}
            console.log('LOGIN_SUCCESS',state, action.user)
            return {...state, user: action.user}
        }
        case 'LOGIN_ERROR': {
            console.log('LOGIN_ERROR', state, action)
            return state
        }

        //async actions
        case 'LOGIN': {
            // action : {dispatch, credentials: {email, password}}
            console.log('LOGIN', state, action)
            let fetchFunction = async () => {
                try {
                    let auth = await db.auth().signInWithEmailAndPassword(
                        action.credentials.email, action.credentials.password
                    )
                    console.log('auth ',auth)
                    action.dispatch({type: 'LOGIN_SUCCESS', user: auth.user.uid})
                } catch (error) {
                    console.log(error)
                    action.dispatch({type: 'LOGIN_ERROR'})
                }
                
            }
    
            fetchFunction()

            return state
        }
        
        default:
            return state
    }
}