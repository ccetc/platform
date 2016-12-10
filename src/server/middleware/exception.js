export default (err, req, res, next) => {

  if(err.code) {
    res.status(err.code()).json(err)
  } else {
    res.status(500).json(err)
  }

}
