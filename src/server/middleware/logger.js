export default (req, res, next) => {
  console.log(`${req.method} ${req.path}\nQUERY: ${JSON.stringify(req.query)}\nBODY: ${JSON.stringify(req.body)}`)
  next()
}
