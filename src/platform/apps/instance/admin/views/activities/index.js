import React from 'react'
import Page from 'portals/admin/components/chrome/page'
import Feed from 'portals/admin/components/feed'

class Index extends React.Component {

  render() {
    const activities = [
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Greg Kops', photo: '/images/greg.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sandy Rep', photo: '/images/sandy.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sharon Anderson', photo: '/images/sharon.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Greg Kops', photo: '/images/greg.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sandy Rep', photo: '/images/sandy.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sharon Anderson', photo: '/images/sharon.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Greg Kops', photo: '/images/greg.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sandy Rep', photo: '/images/sandy.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sharon Anderson', photo: '/images/sharon.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Greg Kops', photo: '/images/greg.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sandy Rep', photo: '/images/sandy.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sharon Anderson', photo: '/images/sharon.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Greg Kops', photo: '/images/greg.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sandy Rep', photo: '/images/sandy.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sharon Anderson', photo: '/images/sharon.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Greg Kops', photo: '/images/greg.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sandy Rep', photo: '/images/sandy.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'created the expense {subject} in the project {object1}' }, user: { id: 1, full_name: 'Sharon Anderson', photo: '/images/sharon.jpg'}, subject: { text: 'food supplies' }, object1: { text: 'Primitive Pursuits' }, object2: null, created_at: new Date() }
    ]
    return (
      <div className="chrome-body">
        <Feed items={activities} />
      </div>
    )
  }

}

const mapPropsToPage = (props, context) => ({
  back: '/admin',
  title: 'Activities',
  permissions: []
})

export default Page(mapPropsToPage)(Index)
