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

export default { getAll, create }