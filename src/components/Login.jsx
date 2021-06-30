import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"


export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
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

    const { login } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setCreating(true)
            await login(formData.email, formData.password)
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
                    <h2 className="text-center mb-4">Log In</h2>
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
                        <Button disabled={creating} className="w-100 mt-4" type="submit">Log In</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
        </>
    )
}
