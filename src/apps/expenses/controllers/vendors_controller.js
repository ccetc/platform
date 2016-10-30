let vendors = {}

vendors.index = (req, res) => {
  res.json({ message: 'vendors index' })
}

vendors.show = (req, res) => {
  res.json({ message: 'vendors show' })
}

vendors.create = (req, res) => {
  res.json({ message: 'vendors create' })
}

vendors.update = (req, res) => {
  res.json({ message: 'vendors update' })
}

vendors.destroy = (req, res) => {
  res.json({ message: 'vendors destroy' })
}

export default vendors
