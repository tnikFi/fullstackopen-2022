import axios from 'axios'

const BASE_URL = '/api/persons'

const getAll = () => {
    const request = axios.get(`${BASE_URL}`)
    return request.then(response => response.data)
}

const create = object => {
    const request = axios.post(`${BASE_URL}`, object)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${BASE_URL}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${BASE_URL}/${id}`, newObject)
    return request.then(response => response.data)
}

const exports = {getAll, create, remove, update}

export default exports