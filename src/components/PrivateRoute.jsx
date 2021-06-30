import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'
import PickDisplayName from './PickDisplayName'

export default function PrivateRoute({component: Component, ...rest}) {
    const {currentUser} = useAuth()

    return (
        <Route {...rest}
        render={props => {
            if (currentUser) {
                if (!currentUser.displayName) {
                    return <PickDisplayName />
                }
            }

            return currentUser ? <Component {...props} /> : <Redirect to="/login"/>
        }}/>
    )
}
