let expenses = {}

expenses.index = (req, res) => {
  res.json({ message: 'expenses index' })
}

expenses.show = (req, res) => {
  res.json({ message: 'expenses show' })
}

expenses.create = (req, res) => {
  res.json({ message: 'expenses create' })
}

expenses.update = (req, res) => {
  res.json({ message: 'expenses update' })
}

expenses.destroy = (req, res) => {
  res.json({ message: 'expenses destroy' })
}

export default expenses
