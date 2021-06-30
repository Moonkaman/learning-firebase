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

    const subscribeToPost = (handleUpdate, postId) => {
        return db.collection('posts').doc(postId)
        .onSnapshot(doc => {
            handleUpdate(doc)
        })
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
            Likes: {}
        })
    }

    const value = {
        subscribeToPosts,
        subscribeToPost,
        createPost
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}
