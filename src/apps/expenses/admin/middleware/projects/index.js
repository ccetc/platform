import { resources } from 'platform/middleware/rest'
import knex from 'platform/services/knex'
import Project from '../../../models/project'
import ProjectSerializer from '../../../serializers/project_serializer'
import Member from '../../../models/member'
import MemberSerializer from '../../../serializers/member_serializer'
import ExpenseType from '../../../models/expense_type'
import ExpenseTypeSerializer from '../../../serializers/expense_type_serializer'
import ExpenseTypeProjectSerializer from '../../../serializers/expense_type_project_serializer'
import User from 'platform/models/user'
import UserSerializer from 'platform/serializers/user_serializer'
import { createProcessor, toggleExpenseTypeProcessor } from './processors'
import { createMemberActivity, toggleExpenseTypeActivity } from './activities'
import { toggleExpenseTypeRenderer } from './renderers'

export default resources({
  allowedParams: ['title','code','is_active'],
  defaultSort: 'code',
  defaultParams: (req) => ({
    is_active: true
  }),
  name: 'project',
  model: Project,
  resources: [
    {
      defaultSort: 'last_name',
      model: User,
      name: 'user',
      only: 'list',
      ownedByTeam: true,
      path: 'members/unassigned',
      query: (qb, req, filters) => {
        qb.joinRaw('left join "expenses_members" on "expenses_members"."user_id"="users"."id" and "expenses_members"."project_id"=?', req.params.project_id)
        qb.whereNull('expenses_members.id')
      },
      serializer: UserSerializer,
      searchParams: ['first_name','last_name','email'],
      sortParams: ['last_name'],
      withRelated: ['photo']
    },{
      defaultSort: 'code',
      model: ExpenseType,
      name: 'expense_type_project',
      only: 'list',
      ownedByTeam: true,
      path: 'expense_types/all',
      query: (qb, req, filters) => {
        qb.select('expenses_expense_types.*', knex.raw('case when expenses_expense_types_projects.id is null then true else false end as enabled'))
        qb.joinRaw('left join expenses_expense_types_projects on expenses_expense_types_projects.expense_type_id=expenses_expense_types.id and expenses_expense_types_projects.project_id=?', req.params.project_id)
      },
      serializer: ExpenseTypeProjectSerializer
    },{
      activity: {
        create: createMemberActivity
      },
      allowedParams: ['project_id','user_id','member_type_id','is_active'],
      defaultParams: (req) => ({
        is_active: true
      }),
      defaultSort: ['member_type_id', 'last_name'],
      model: Member,
      name: 'member',
      processor: {
        create: createProcessor
      },
      query: (qb, req, filters) => {
        qb.innerJoin('users','users.id','expenses_members.user_id')
        qb.where({ project_id: req.params.project_id })
      },
      serializer: {
        all: MemberSerializer
      },
      withRelated: ['user.photo','member_type']
    },{
      actions: {
        toggle: {
          activity: toggleExpenseTypeActivity,
          on: 'member',
          path: 'toggle',
          method: 'patch',
          processor: toggleExpenseTypeProcessor,
          renderer: toggleExpenseTypeRenderer
        }
      },
      defaultSort: 'code',
      only: 'list',
      model: ExpenseType,
      name: 'expense_type',
      ownedByTeam: true,
      query: (qb, req, filters) => {
        qb.joinRaw('left join expenses_expense_types_projects on expenses_expense_types_projects.expense_type_id=expenses_expense_types.id and expenses_expense_types_projects.project_id=?', req.params.project_id)
        qb.whereNull('expenses_expense_types_projects.id')
      },
      searchParams: ['code','title','description'],
      serializer: ExpenseTypeSerializer
    }
  ],
  rights: ['expenses.manage_configuration'],
  searchParams: ['code','title'],
  serializer: ProjectSerializer,
  sortParams: ['title','code','is_active']
})
