import React, {useState} from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

import { useData } from "../contexts/DataContext";
import { useAuth } from "../contexts/AuthContext"

export default function CreatePostModal({show, close}) {
    const [formValues, setFormValues] = useState({
        Title: "",
        Body: ""
    })

    const handleChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const {createPost} = useData()
    const {currentUser} = useAuth()

    const submitPost = e => {
        e.preventDefault()

        createPost(formValues.Title, formValues.Body, currentUser)
    }

    return (
        <Modal
            size="lg"
            centered
            show={show}
            onHide={close}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Create a Post
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={e => {
                    submitPost(e)
                    close()
                    }}>
                    <Form.Group className="mb-2">
                        <Form.Label>Post Title</Form.Label>
                        <Form.Control name="Title" value={formValues.Title} onChange={handleChange} type="text" placeholder="Enter a title for your post" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Post Body</Form.Label>
                        <Form.Control name="Body" value={formValues.Body} onChange={handleChange} as="textarea" placeholder="Type out the body of your post here" />
                    </Form.Group>
                    <Button type="submit" className="w-100 mt-4">Submit Post</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
