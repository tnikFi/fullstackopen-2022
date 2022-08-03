import axios from 'axios'

const SERVER_URL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(SERVER_URL)
    return request.then(response => response.data)
}

const create = object => {
    const request = axios.post(SERVER_URL, object)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${SERVER_URL}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${SERVER_URL}/${id}`, newObject)
    return request.then(response => response.data)
}

const exports = {getAll, create, remove, update}

export default exports