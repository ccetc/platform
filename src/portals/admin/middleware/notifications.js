import { Router } from 'express'
// import Notification from 'platform/models/notification'

const notifications = Router()

notifications.get('/notifications', (req, res, next) => {
  res.status(200).json({
    data: [
      { id: 1, is_read: false, story: { text: 'assigned the task {subject} to you' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'finish the platform', url: '/admin/reimbursement/projects/1' }, created_at: new Date() },
      { id: 1, is_read: false, story: { text: 'assigned the task {subject} to you' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'finish the platform', url: '/admin/reimbursement/projects/1' }, created_at: new Date() },
      { id: 1, is_read: false, story: { text: 'assigned the task {subject} to you' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'finish the platform', url: '/admin/reimbursement/projects/1' }, created_at: new Date() },
      { id: 1, is_read: false, story: { text: 'assigned the task {subject} to you' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'finish the platform', url: '/admin/reimbursement/projects/1' }, created_at: new Date() },
      { id: 1, is_read: true, story: { text: 'assigned the task {subject} to you' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'finish the platform', url: '/admin/reimbursement/projects/1' }, created_at: new Date() },
      { id: 1, is_read: true, story: { text: 'assigned the task {subject} to you' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'finish the platform', url: '/admin/reimbursement/projects/1' }, created_at: new Date() },
      { id: 1, is_read: true, story: { text: 'assigned the task {subject} to you' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'finish the platform', url: '/admin/reimbursement/projects/1' }, created_at: new Date() },
      { id: 1, is_read: true, story: { text: 'assigned the task {subject} to you' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'finish the platform', url: '/admin/reimbursement/projects/1' }, created_at: new Date() },
      { id: 1, is_read: true, story: { text: 'assigned the task {subject} to you' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'finish the platform', url: '/admin/reimbursement/projects/1' }, created_at: new Date() },
      { id: 1, is_read: true, story: { text: 'assigned the task {subject} to you' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'finish the platform', url: '/admin/reimbursement/projects/1' }, created_at: new Date() }
    ],
    skip: 0,
    limit: 10,
    total: 100
  })
})

export default notifications
