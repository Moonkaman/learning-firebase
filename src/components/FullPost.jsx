import React, { useState, useEffect } from 'react'
import { Card, Spinner, Button, Form } from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'
import {Link, useParams, useHistory} from 'react-router-dom'
import {useData} from '../contexts/DataContext'
import {useAuth} from '../contexts/AuthContext'

import Comment from './Comment'

export default function FullPost() {
    const {postid} = useParams()
    const [postData, setPostData] = useState(null)
    const [commentsData, setCommentsData] = useState([])
    const [showCommentForm, setShowCommentForm] = useState(false)
    const [commentFormText, setCommentFormText] =  useState("")

    const {subscribeToPost, likePost, unlikePost, createComment} = useData()
    const {currentUser} = useAuth()
    const history = useHistory()

    useEffect(() => {
        const {unsubscribeFromPost, unsubscribeFromPostComments} = subscribeToPost(doc => {
            const fetchedPostData = doc.data()
            setPostData({
                ...fetchedPostData,
                id: postid
            })
        }, 
        commentCollection => {
            const newComments = []
            commentCollection.forEach(doc => {
                const data = doc.data()
                newComments.push(data)
            })

            setCommentsData(newComments)

            console.log(commentsData)
        }, postid)

        return () => {
            unsubscribeFromPost()
            unsubscribeFromPostComments()
        }
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

    const handleSubmitComment = e => {
        e.preventDefault()

        createComment(commentFormText, postid, currentUser)

        setShowCommentForm(false)
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
            <div className="d-flex justify-content-between align-items-center mb-2 mt-4" style={{padding: "0px 10px"}}>
                <p style={{marginBottom: "0px"}}>Comments</p>
                {!showCommentForm && <Button variant="success" onClick={_ => setShowCommentForm(true)}>Add Comment</Button>}
            </div>
            {showCommentForm && (
                <Form className="mb-3" style={{padding: "0px 10px"}} onSubmit={handleSubmitComment}>
                    <Form.Group className="d-flex">
                        <Form.Control as="textarea" placeholder="Type your comment here..." value={commentFormText} onChange={e => setCommentFormText(e.target.value)}>

                        </Form.Control>
                        <Button type="submit" style={{marginLeft: "10px"}}>Comment</Button>
                    </Form.Group>
                </Form>
            )}
            <div style={{padding: "0 10px"}}>
                {commentsData.map(comment => <Comment commentData={comment} />)}
            </div>
        </div>
    )
}
