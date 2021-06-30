import React, { useState, useEffect } from 'react'
import { Card, Spinner, Button } from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import {Link, useParams, useHistory} from 'react-router-dom'
import {useData} from '../contexts/DataContext'

export default function FullPost() {
    const {postid} = useParams()
    const [postData, setPostData] = useState(null)

    const {subscribeToPost} = useData()

    const history = useHistory()

    useEffect(() => {
        const unsubscribe = subscribeToPost(doc => {
            setPostData(doc.data())
        },postid)

        return unsubscribe
    }, [])

    if (!postData) {
        return (
        <>
            <Spinner animation="border" variant="primary" />
        </>
        )
    }

    return (
        <div className="w-100" style={{maxWidth: "1000px"}}>
            <Button variant="link" onClick={_ => {
                history.push("/")
            }}>{"< Back To Posts"}</Button>
            <Card className="mb-2">
                <Card.Header>
                    <Card.Title className="d-flex justify-content-between align-items-center mb-0">
                        {postData.Title}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Posted By: {postData.PostedBy}</Card.Subtitle>
                </Card.Header>
                <Card.Body>
                    
                    <Card.Text>{postData.Body}</Card.Text>
                </Card.Body>            
            </Card>
        </div>
    )
}
