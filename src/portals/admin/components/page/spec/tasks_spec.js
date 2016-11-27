import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { spy } from 'sinon'
import { Tasks } from '../tasks'

describe('tasks component', () => {
  const onChooseTask = spy()
  const onToggleTasks = spy()

  const config = {
    tasks: [
      { label: 'Task One', route: '/task/1' },
      { label: 'Task Two', route: '/task/2' }
    ],
    onChooseTask,
    onToggleTasks
  }

  it('renders closed', () => {
    const tasks = shallow(
      <Tasks { ...config } showTasks={false} />
    )
    expect(tasks.is('Transition')).to.be.truthy
    expect(tasks.children().length).to.be.eql(0)
  })

  it('renders open', () => {
    const tasks = shallow(
      <Tasks { ...config } showTasks={true} />
    )
    expect(tasks.is('Transition')).to.be.truthy
    expect(tasks.children().length).to.be.eql(2)

    const overlay = tasks.childAt(0)
    expect(overlay.is('div.chrome-tasks-overlay')).to.be.truthy
    overlay.simulate('click')
    expect(onToggleTasks.calledOnce).to.be.truthy

    const modal = tasks.childAt(1)
    expect(modal.is('div.chrome-tasks')).to.be.truthy
    expect(modal.children().length).to.be.eql(3)

    const task_one = modal.childAt(0)
    expect(task_one.is('div.chrome-task')).to.be.truthy
    expect(task_one.text()).to.be.eql('Task One')
    task_one.simulate('click')
    expect(onChooseTask.calledOnce).to.be.truthy

    const task_two = modal.childAt(1)
    expect(task_two.is('div.chrome-task')).to.be.truthy
    expect(task_two.text()).to.be.eql('Task Two')
    task_two.simulate('click')
    expect(onChooseTask.calledTwice).to.be.truthy

    const task_cancel = modal.childAt(2)
    expect(task_cancel.is('div.chrome-cancel')).to.be.truthy
    expect(task_cancel.text()).to.be.eql('Cancel')
    task_cancel.simulate('click')
    expect(onToggleTasks.calledTwice).to.be.truthy
  })

})