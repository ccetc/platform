let trips = {}

trips.index = (req, res) => {
  res.json({ message: 'trips index' })
}

trips.show = (req, res) => {
  res.json({ message: 'trips show' })
}

trips.create = (req, res) => {
  res.json({ message: 'trips create' })
}

trips.update = (req, res) => {
  res.json({ message: 'trips update' })
}

trips.destroy = (req, res) => {
  res.json({ message: 'trips destroy' })
}

export default trips
