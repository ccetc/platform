let projects = {}

projects.index = (req, res) => {
  res.json({ message: 'projects index' })
}

projects.show = (req, res) => {
  res.json({ message: 'projects show' })
}

projects.create = (req, res) => {
  res.json({ message: 'projects create' })
}

projects.update = (req, res) => {
  res.json({ message: 'projects update' })
}

projects.destroy = (req, res) => {
  res.json({ message: 'projects destroy' })
}

export default projects
