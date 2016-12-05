import React from 'react'
import moment from 'moment'
import Page from 'portals/admin/components/chrome/page'

class Index extends React.Component {

  render() {
    const activities = [
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Greg Kops', photo: '/images/greg.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Sandy Rep', photo: '/images/sandy.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Sharon Anderson', photo: '/images/sharon.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Greg Kops', photo: '/images/greg.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Sandy Rep', photo: '/images/sandy.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Sharon Anderson', photo: '/images/sharon.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Greg Kops', photo: '/images/greg.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Sandy Rep', photo: '/images/sandy.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Sharon Anderson', photo: '/images/sharon.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Greg Kops', photo: '/images/greg.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Sandy Rep', photo: '/images/sandy.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Sharon Anderson', photo: '/images/sharon.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Greg Kops', photo: '/images/greg.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Sandy Rep', photo: '/images/sandy.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Sharon Anderson', photo: '/images/sharon.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Greg Kops', photo: '/images/greg.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Sandy Rep', photo: '/images/sandy.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() },
      { id: 1, story: { text: 'added the item {subject} to {object1}' }, user: { id: 1, full_name: 'Sharon Anderson', photo: '/images/sharon.jpg'}, subject: { text: 'Cooking Matters in Your Food Pantry at JCEO Food Pantry' }, object1: { text: 'events' }, object2: null, created_at: new Date() }
    ]
    return (
      <div className="chrome-body">
        <div className="activities">

          {activities.map((activity, index) => {
            let story = activity.story.text
            if(activity.subject) {
              story = story.replace('{subject}', `<span class="activity-subject">${activity.subject.text}</span>`)
            }
            if(activity.object1) {
              story = story.replace('{object1}', `<span class="activity-object">${activity.object1.text}</span>`)
            }
            if(activity.object2) {
              story = story.replace('{object2}', `<span class="activity-object">${activity.object2.text}</span>`)
            }
            return (
              <div key={`activity_${index}`} className="activity">
                <div className="activity-avatar">
                  <img src={ activity.user.photo } className="ui circular image" />
                </div>
                <div className="activity-details">
                  <div className="activity-story">
                    <span className="activity-user">{ activity.user.full_name }</span>
                    <span dangerouslySetInnerHTML={{__html: story }} />
                  </div>
                  <div className="activity-timestamp">{ moment(activity.created_at).fromNow() } on { moment(activity.created_at).format('dddd, MMMM Do @ h:mm a') }</div>
                </div>
              </div>
            )
          })}

        </div>
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
