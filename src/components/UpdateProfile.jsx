import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"


export default function UpdateProfile() {
    const { currentUser, updateEmail, updatePassword } = useAuth()

    const [formData, setFormData] = useState({
        email: currentUser.email,
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

    async function handleSubmit(e) {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords don't match")
        }

        setError('')
        setCreating(true)

        const promises = []
        if (formData.email !== currentUser.email) {
            promises.push(updateEmail(formData.email))
        }
        if (formData.password !== "") {
            promises.push(updatePassword(formData.password))
        }

        Promise.all(promises).then(_ => {
            history.push('/')
        })
        .catch(err => {
            setError(err.message)
        }).finally(_ => {
            setCreating(false)
        })

        // try {
        //     await signup(formData.email, formData.password)
        //     history.push('/')
        // } catch(err) {
        //     console.log(err)
        //     setError(err.message)
        // }

        setCreating(false)
    }

    return (
        <>
         <Card>
             <Card.Body>
                 <h2 className="text-center mb-4">Update Profile</h2>
                 {error && <Alert variant="danger">{error}</Alert>}
                 <Form onSubmit={handleSubmit}>
                     <Form.Group id="email">
                         <Form.Label>Email</Form.Label>
                         <Form.Control value={formData.email} onChange={handleChange} type="email" name="email"/>
                     </Form.Group>
                     <Form.Group id="password">
                         <Form.Label>Password</Form.Label>
                         <Form.Control value={formData.password} onChange={handleChange} type="password" name="password" placeholder="Leave blank to keep the same"/>
                     </Form.Group>
                     <Form.Group id="conform-password">
                         <Form.Label>Confirm Password</Form.Label>
                         <Form.Control value={formData.confirmPassword} onChange={handleChange} type="password" name="confirmPassword" placeholder="Leave blank to keep the same"/>
                     </Form.Group>
                     <Button disabled={creating} className="w-100 mt-4" type="submit">Update</Button>
                 </Form>
             </Card.Body>
         </Card>
         <div className="w-100 text-center mt-2">
            <Link to="/">Cancel</Link>
         </div>
        </>
    )
}
