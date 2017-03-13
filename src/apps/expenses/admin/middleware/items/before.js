export default {
  update: (req) => {
    req.body.approved_by_id = null
    req.body.approved_at = null
    req.body.is_approved = null
    req.body.reason_rejected = null
  }
}
