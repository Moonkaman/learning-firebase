import React, { useState } from 'react'
import { Card, Collapse } from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'
import {Link} from 'react-router-dom'
import {useData} from '../contexts/DataContext'
import {useAuth} from '../contexts/AuthContext'

export default function Post({ postData }) {
    const [open, setOpen] = useState(false)

    const toggleOpen = _ => {
        setOpen(!open)
    }

    const {likePost, unlikePost} = useData()
    const {currentUser} = useAuth()

    const likedPost = postData.Likes.includes(currentUser.uid)

    const handleLikePost = e => {
        e.stopPropagation()

        if (!likedPost) {
            likePost(postData, currentUser.uid)
        } else {
            unlikePost(postData, currentUser.uid)
        }
    }

    

    return (
        <Card className="mb-2">
            <Card.Body className="d-flex justify-content-between align-items-center">
                <Link className="text-decoration-none" to={`/posts/${postData.id}`}>
                    <div>
                        <Card.Title className="d-flex justify-content-between align-items-center mb-0">
                            {postData.Title}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Posted By: {postData.PostedBy}</Card.Subtitle>
                    </div>
                </Link>
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
            </Card.Body>            
        </Card>
    )
}
