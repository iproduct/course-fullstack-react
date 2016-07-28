export function getMaxId( objectCollection ) {
    let maxId = 0;
    objectCollection.forEach((obj) => {
        if(maxId < obj.id)
            maxId = obj.id;
    });
    return maxId;
}

export function findById( objectCollection, objectId ) {
    for(let i = 0; i < objectCollection.length; i++){
        if(objectCollection[i].id === objectId) return objectCollection[i];
    }
    return null;
}

export function removeById( objectCollection, objectId ) {
    return objectCollection.filter((obj) => {
        return obj.id !== objectId;
    });
}

export function setById( objectCollection, objectId, newObject ) {
    return objectCollection.map((obj) => {
        return (obj.id === objectId) ? newObject : obj;
    });
}