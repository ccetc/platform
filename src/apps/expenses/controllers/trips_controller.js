let controller = {}

controller.index = (req, res) => {
  res.json({ message: 'controller index' })
}

controller.show = (req, res) => {
  res.json({ message: 'controller show' })
}

controller.create = (req, res) => {
  res.json({ message: 'controller create' })
}

controller.update = (req, res) => {
  res.json({ message: 'controller update' })
}

controller.destroy = (req, res) => {
  res.json({ message: 'controller destroy' })
}

export default controller
