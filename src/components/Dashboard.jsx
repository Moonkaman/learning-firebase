import React, { useState, useEffect } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

import { useData } from "../contexts/DataContext";

import Post from './Post';
import CreatePostModal from './CreatePostModal';

export default function Dashboard() {
    const [error, setError] = useState('')
    const {currentUser, logout} = useAuth()
    const history = useHistory()
    const { subscribeToPosts } = useData()
    const [posts, setPosts] = useState([])
    const [postModalOpen, setPostModalOpen] = useState(false)

    useEffect(_ => {
        const unsubscribe = subscribeToPosts(postCollection => {
            const newPosts = []
            postCollection.forEach(doc => {
                console.log(doc.id)
                const data = doc.data()
                newPosts.push({...data, id: doc.id})
            })
            setPosts(newPosts)
        })

        return unsubscribe
    }, [])

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/login')
        } catch(err) {
            setError(err.message)
        }
    }

    const closeModal = _ => {
        setPostModalOpen(false)
    }

    return (
        <>
            {postModalOpen && <CreatePostModal show={postModalOpen} close={closeModal} />}
            <div className="w-100" style={{maxWidth: "1000px"}}>
                <Card>
                    <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                        Posts
                        <Button variant="success" onClick={_ => setPostModalOpen(true)}>+ Create Post</Button>
                    </Card.Header>
                    <Card.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {posts.map(post => <Post postData={post} key={post.id} />)}
                        {/* <strong>Email:</strong> {currentUser.email}
                        <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link> */}
                    </Card.Body>        
                </Card>
                <div className="w-100 text-center mt-2">
                    <Button variant="link" onClick={handleLogout}>Log Out</Button>
                </div>
            </div>
        </>
    )
}
