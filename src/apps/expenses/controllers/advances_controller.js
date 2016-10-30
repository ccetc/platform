let advances = {}

advances.index = (req, res) => {
  res.json({ message: 'advances index' })
}

advances.show = (req, res) => {
  res.json({ message: 'advances show' })
}

advances.create = (req, res) => {
  res.json({ message: 'advances create' })
}

advances.update = (req, res) => {
  res.json({ message: 'advances update' })
}

advances.destroy = (req, res) => {
  res.json({ message: 'advances destroy' })
}

export default advances
