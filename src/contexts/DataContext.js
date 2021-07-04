import React, {useContext, useState, useEffect} from 'react'
import {db, Timestamp} from '../firebase'

const DataContext = React.createContext()

export function useData() {
    return useContext(DataContext)
}

export function DataProvider({ children }) {
    const subscribeToPosts = (handleUpdate) => {
        return db.collection('posts').orderBy("PostedAt", "desc").onSnapshot(postCollection => {
            handleUpdate(postCollection)
        })
    }

    const subscribeToPost = (handlePostUpdate, handleCommentUpdate, postId) => {
        const unsubscribeFromPost = db.collection('posts').doc(postId)
        .onSnapshot(doc => {
            handlePostUpdate(doc)
        })

        const unsubscribeFromPostComments = db.collection('posts').doc(postId).collection("comments")
        .onSnapshot(commentCollection => {
            handleCommentUpdate(commentCollection)
        })

        return {
            unsubscribeFromPost,
            unsubscribeFromPostComments
        }
    }

    const createPost = (title, body, currentUser) => {
        if (!title || !body || !currentUser) {
            return
        }

        if (title.split(" ").join("") == "" || body.split(" ").join("") == "") {
            return
        }

        db.collection('posts').add({
            Title: title,
            Body: body,
            PostedAt: Timestamp.now(),
            PostedBy: currentUser.displayName,
            PosterId: currentUser.uid,
            Likes: []
        })
    }

    const createComment = (comment, postId, currentUser) => {
        if (!comment || !currentUser || !postId) {
            return
        }

        if (comment.split(" ").join("") == "") {
            return
        }

        db.collection("posts").doc(postId).collection("comments").add({
            Comment: comment,
            Likes: [],
            PostedAt: Timestamp.now(),
            PostedBy: currentUser.displayName,
            PosterId: currentUser.uid
        })
    }

    const likePost = (postData, userId) => {

        if (!postData.Likes.includes(userId)) {
            const newLikes = [...postData.Likes, userId]

            return db.collection('posts').doc(postData.id).update({
                Likes: newLikes
            })
        }
    }

    const unlikePost = (postData, userId) => {
        const newLikes = postData.Likes.filter(likedUserId => {
            if (likedUserId !== userId) {
                return likedUserId
            }
        })

        return db.collection('posts').doc(postData.id).update({
            Likes: newLikes
        })
    }

    const value = {
        subscribeToPosts,
        subscribeToPost,
        createPost,
        likePost,
        unlikePost,
        createComment
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}
