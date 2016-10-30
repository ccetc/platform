let members = {}

members.index = (req, res) => {
  res.json({ message: 'members index' })
}

members.show = (req, res) => {
  res.json({ message: 'members show' })
}

members.create = (req, res) => {
  res.json({ message: 'members create' })
}

members.update = (req, res) => {
  res.json({ message: 'members update' })
}

members.destroy = (req, res) => {
  res.json({ message: 'members destroy' })
}

export default members
