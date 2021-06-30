import React, { useState } from 'react'
import { Card, Collapse } from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

export default function Post({ postData }) {
    const [open, setOpen] = useState(false)

    const toggleOpen = _ => {
        setOpen(!open)
    }

    return (
        <Link className="text-decoration-none" to={`/posts/${postData.id}`}>
            <Card className="mb-2">
                <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center mb-0">
                        {postData.Title}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Posted By: {postData.PostedBy}</Card.Subtitle>
                </Card.Body>            
            </Card>
        </Link>
    )
}
