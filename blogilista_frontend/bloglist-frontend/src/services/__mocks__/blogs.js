const blogs= [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {
      username: 'larimari',
      name: 'Maria Larionova',
      id: '5c6e9d89f389bd082c60172c'
    },
    id: '5c6fd16dc5c28e0472bf0c9b'
  },
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 9,
    user: {
      username: 'mymy',
      name: 'Pikku Myy',
      id: '5c6fd1e0c5c28e0472bf0c9c'
    },
    id: '5c6fe00afea3be05dc74c8e3'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }