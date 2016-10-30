let users = {}

users.index = (req, res) => {
  res.json({ message: 'users index' })
}

users.show = (req, res) => {
  res.json({ message: 'users show' })
}

users.create = (req, res) => {
  res.json({ message: 'users create' })
}

users.update = (req, res) => {
  res.json({ message: 'users update' })
}

users.destroy = (req, res) => {
  res.json({ message: 'users destroy' })
}

export default users
