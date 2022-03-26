import { openDB } from 'idb';

const createObjectStore = async (database, tableName) => {
    
    const upgrade = (db) => db.createObjectStore(tableName, { autoIncrement: true });

    try {
        return await openDB(database, 1, { upgrade });
    } catch (error) {
        console.log("Error in createObjectStore", error)
    }

}

export const getValue = async (database, tableName, id) => {
    const connectStore = await createObjectStore(database, tableName);
    const store = connectStore.transaction(tableName, 'readonly').objectStore(tableName);
    return await store.get(id);
}

export const getAllValue = async (database, tableName) => {
    const connectStore = await createObjectStore(database, tableName);
    const store = connectStore.transaction(tableName, 'readonly').objectStore(tableName);
    return await store.getAll();
}

export const putValue = async (database, tableName, value) => {
    const connectStore = await createObjectStore(database, tableName);
    const store = connectStore.transaction(tableName, 'readwrite').objectStore(tableName);
    return await store.put(value);
}

export const deleteValue = async (database, tableName, id) => {
    const connectStore = await createObjectStore(database, tableName);
    const store = connectStore.transaction(tableName, 'readwrite').objectStore(tableName);
    const result = await store.get(id);
    if (!result) return result;
    await store.delete(id);
    return id;
}

export const clearDB = async (database, tableName) => {
    const connectStore = await createObjectStore(database, tableName);
    const store = connectStore.transaction(tableName, 'readwrite').objectStore(tableName);
    return await store.clear();
}