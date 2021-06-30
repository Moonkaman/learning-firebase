import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"


export default function PickDisplayName() {
    const [formData, setFormData] = useState({
        displayName: ""
    })

    const history = useHistory()

    const [error, setError] = useState('')
    const [creating, setCreating] = useState(false)

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const { updateDisplayName } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setCreating(true)
            await updateDisplayName(formData.displayName)
            history.push('/')
        } catch(err) {
            console.log(err)
            setError(err.message)
        }

        setCreating(false)
    }

    return (
        <>
        <div className="w-100" style={{maxWidth: "400px"}}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Pick a display name</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="displayName">
                            <Form.Label>Display Name</Form.Label>
                            <Form.Control value={formData.displayName} onChange={handleChange} type="text" name="displayName" required/>
                        </Form.Group>
                        <Button disabled={creating} className="w-100 mt-4" type="submit">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
         </div>
        </>
    )
}
