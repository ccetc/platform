export default {

  index: (req, res) => {
    res.json({ message: 'contacts index' })
  },

  show: (req, res) => {
    res.json({ message: 'contacts show' })
  },

  create: (req, res) => {
    res.json({ message: 'contacts create' })
  },

  update: (req, res) => {
    res.json({ message: 'contacts update' })
  },

  destroy: (req, res) => {
    res.json({ message: 'contacts destroy' })
  }

}
