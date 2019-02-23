import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = { headers: { Authorization: token }, }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async blogObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject, config)
  return response.data
}

const remove = async deleteObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${deleteObject.id}`, config)
  return response.data
}

export default { getAll, create, update, setToken, remove }