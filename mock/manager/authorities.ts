import { Request, Response } from 'express';
import { Role } from '@/models/systemManage/role/role';
import moment from 'moment';

const roles: Role[] = [
  {
    id: 1,
    name: 'admin',
    chineseName: '管理员',
    description: '拥有至高无上的权力',
    time: '2020-07-15T06:13:37Z'
  },
  {
    id: 2,
    name: 'editor',
    chineseName: '编辑员',
    description: '具有一些权力',
    time: '2020-07-15T06:13:37Z'
  },
];
export default {
  'GET /api/manager/authorities': {
    code: 0,
    data: roles,
  },
  'POST /api/manager/authorities': (req: Request, res: Response) => {
    roles.push({
      id: roles[roles.length - 1].id + 1,
      name: req.body.name,
      chineseName: req.body.chineseName,
      description: req.body.description,
      time: moment().utc().format()
    });
    res.send({
      code: 0,
      data: 'OK',
    });
  },
  'DELETE /api/manager/authorities/2': {
    code: 0,
    data: 'OK',
  },
  'PUT /api/manager/authorities/1': {
    code: 0,
    data: roles,
  },
};
