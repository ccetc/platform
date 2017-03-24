import { resources } from 'platform/middleware/rest'
import Resource from '../../../models/resource'
import ResourceSerializer from '../../../serializers/resource_serializer'
import knex from 'platform/services/knex'

export default resources({
  filterParams: ['competency_id'],
  model: Resource,
  name: 'resource',
  query: (qb, req, filters) => {
    qb.select(knex.raw('distinct on (competencies_resources.id,competencies_resources.title) competencies_resources.*'))
    qb.innerJoin('competencies_competencies_resources', 'resource_id', 'id')
  },
  searchParams: ['title','description'],
  serializer: ResourceSerializer,
  sortParams: ['title']
})
