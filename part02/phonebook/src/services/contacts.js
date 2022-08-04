import axios from 'axios'

const BASE_URL = 'http://localhost:3001/api'

const getAll = () => {
    const request = axios.get(`${BASE_URL}/persons`)
    return request.then(response => response.data)
}

const create = object => {
    const request = axios.post(`${BASE_URL}/persons`, object)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${BASE_URL}/persons/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${BASE_URL}/persons/${id}`, newObject)
    return request.then(response => response.data)
}

const exports = {getAll, create, remove, update}

export default exports