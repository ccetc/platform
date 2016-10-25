let contacts = {}

contacts.index = (req, res) => {
  res.json({ message: 'contacts index' })
}

contacts.show = (req, res) => {
  res.json({ message: 'contacts show' })
}

contacts.create = (req, res) => {
  res.json({ message: 'contacts create' })
}

contacts.update = (req, res) => {
  res.json({ message: 'contacts update' })
}

contacts.destroy = (req, res) => {
  res.json({ message: 'contacts destroy' })
}

export default contacts
