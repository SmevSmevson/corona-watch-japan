let updateCollection = (db, collectionId, data) => {
    console.log(db, collectionId)
    data.forEach(el => {
        console.log(el)
        db.firestore().collection(collectionId).doc(`${el.case_number}`).set(el)
    })
}

export {updateCollection}