import Promise from 'bluebird'

export default (req) => {

  return Promise.resolve({
    label: 'Competencies', icon: 'trophy', items: [
      { label: 'Configuration', rights: [], items: [
        { label: 'Categories', rights: [], route: '/admin/competencies/categories' },
        { label: 'Classifications', rights: [], route: '/admin/competencies/classifications' },
        { label: 'Competencies', rights: [], route: '/admin/competencies/competencies' },
        { label: 'Positions', rights: [], route: '/admin/competencies/positions' },
        { label: 'Programs', rights: [], route: '/admin/competencies/programs' },
        { label: 'Resources', rights: [], route: '/admin/competencies/resources' }
      ] },
      { label: 'Supervision', rights: [], items: [
        { label: 'Plans', rights: [], route: '/admin/competencies/plans' }
      ] },
      { label: 'Plans', rights: [], route: '/admin/competencies/plans' }
    ]
  })

}
