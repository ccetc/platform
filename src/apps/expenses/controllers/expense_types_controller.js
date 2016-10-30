let expense_types = {}

expense_types.index = (req, res) => {
  res.json({ message: 'expense_types index' })
}

expense_types.show = (req, res) => {
  res.json({ message: 'expense_types show' })
}

expense_types.create = (req, res) => {
  res.json({ message: 'expense_types create' })
}

expense_types.update = (req, res) => {
  res.json({ message: 'expense_types update' })
}

expense_types.destroy = (req, res) => {
  res.json({ message: 'expense_types destroy' })
}

export default expense_types
