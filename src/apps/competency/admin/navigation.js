import Promise from 'bluebird'

export default (req) => {

  return Promise.resolve({
    label: 'Competency', icon: 'trophy', items: [
      { label: 'Configuration', rights: [], items: [
        { label: 'Categories', rights: [], route: '/admin/competency/categories' },
        { label: 'Classifications', rights: [], route: '/admin/competency/classifications' },
        { label: 'Competencies', rights: [], route: '/admin/competency/competencies' },
        { label: 'Positions', rights: [], route: '/admin/competency/positions' },
        { label: 'Programs', rights: [], route: '/admin/competency/programs' },
        { label: 'Resources', rights: [], route: '/admin/competency/resources' },
        { label: 'Skills', rights: [], route: '/admin/competency/skills' }
      ] },
      { label: 'Supervision', rights: [], items: [
        { label: 'Plans', rights: [], route: '/admin/competency/plans' }
      ] },
      { label: 'Plans', rights: [], route: '/admin/competency/plans' }
    ]
  })

}
