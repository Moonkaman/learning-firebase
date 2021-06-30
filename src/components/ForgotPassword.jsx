import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from "react-router-dom"


export default function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: ""
    })

    const [error, setError] = useState('')
    const [creating, setCreating] = useState(false)
    const [message, setMessage] = useState('')

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const { resetPassword } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setMessage('')
            setCreating(true)
            await resetPassword(formData.email)
            setMessage("A password reset email has been sent")
        } catch(err) {
            console.log(err)
            setError(err.message)
        }

        setCreating(false)
    }

    return (
        <>
         <Card>
             <Card.Body>
                 <h2 className="text-center mb-4">Reset Password</h2>
                 {error && <Alert variant="danger">{error}</Alert>}
                 {message && <Alert variant="success">{message}</Alert>}
                 <Form onSubmit={handleSubmit}>
                     <Form.Group id="email">
                         <Form.Label>Email</Form.Label>
                         <Form.Control value={formData.email} onChange={handleChange} type="email" name="email" required/>
                     </Form.Group>
                     <Button disabled={creating} className="w-100 mt-4" type="submit">Reset Password</Button>
                 </Form>
                 <div className="w-100 text-center mt-3">
                     <Link to="/login">Login</Link>
                 </div>
             </Card.Body>
         </Card>
         <div className="w-100 text-center mt-2">
             Need an account? <Link to="/signup">Sign Up</Link>
         </div>
        </>
    )
}
