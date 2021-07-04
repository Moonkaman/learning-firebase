import React from 'react'
import { Card } from 'react-bootstrap'

export default function Comment({commentData}) {
    return (
        <Card className="mb-2">
            <Card.Body>
                <Card.Title>
                    {commentData.PostedBy}
                </Card.Title>
                <Card.Text>
                    {commentData.Comment}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
