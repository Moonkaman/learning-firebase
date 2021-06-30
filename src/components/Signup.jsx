import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"


export default function Signup() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
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

    const { signup } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords don't match")
        }

        try {
            setError('')
            setCreating(true)
            await signup(formData.email, formData.password)
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
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={formData.email} onChange={handleChange} type="email" name="email" required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={formData.password} onChange={handleChange} type="password" name="password" required/>
                        </Form.Group>
                        <Form.Group id="conform-password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control value={formData.confirmPassword} onChange={handleChange} type="password" name="confirmPassword" required/>
                        </Form.Group>
                        <Button disabled={creating} className="w-100 mt-4" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
         </div>
        </>
    )
}
