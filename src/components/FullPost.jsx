import React, { useState, useEffect } from 'react'
import { Card, Spinner, Button } from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'
import {Link, useParams, useHistory} from 'react-router-dom'
import {useData} from '../contexts/DataContext'
import {useAuth} from '../contexts/AuthContext'

export default function FullPost() {
    const {postid} = useParams()
    const [postData, setPostData] = useState(null)

    const {subscribeToPost, likePost, unlikePost} = useData()
    const {currentUser} = useAuth()
    const history = useHistory()

    useEffect(() => {
        const unsubscribe = subscribeToPost(doc => {
            const fetchedPostData = doc.data()
            setPostData({
                ...fetchedPostData,
                id: postid
            })
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

    const likedPost = postData.Likes.includes(currentUser.uid)

    const handleLikePost = e => {
        e.stopPropagation()
        console.log(likedPost)

        if (!likedPost) {
            likePost(postData, currentUser.uid)
        } else {
            unlikePost(postData, currentUser.uid)
        }
    }


    return (
        <div className="w-100" style={{maxWidth: "1000px"}}>
            <Button variant="link" onClick={_ => {
                history.push("/")
            }}>{"< Back To Posts"}</Button>
            <Card className="mb-2">
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <div>
                        <Card.Title className="d-flex justify-content-between align-items-center mb-0">
                            {postData.Title}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Posted By: {postData.PostedBy}</Card.Subtitle>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        {likedPost ? (
                            <FontAwesomeIcon icon={faHeart} color="#eb4d4b" size="lg" onClick={handleLikePost}/>
                        ) : (
                            <FontAwesomeIcon icon={farHeart} color="#eb4d4b" size="lg" onClick={handleLikePost}/>
                        )}
                        <p style={{ color: "#eb4d4b", marginBottom: "0px", width: "20px", textAlign: "center", marginLeft: "5px"}}>
                            {
                                postData.Likes.length
                            }
                        </p>
                    </div>
                </Card.Header>
                <Card.Body>
                    
                    <Card.Text>{postData.Body}</Card.Text>
                </Card.Body>            
            </Card>
        </div>
    )
}
