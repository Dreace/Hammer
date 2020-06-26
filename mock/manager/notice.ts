import { Request, Response } from 'express';
import { Notice } from '@/models/manager/notice';
import moment from 'moment';

const notices: Notice[] = [
  {
    id: 1,
    title: '测试',
    content: '测试',
    time: '2020-06-15T06:13:37Z',
    isStick: false,
    isImportant: true,
    announcer: 'string',
  },
  {
    id: 2,
    title: '关于公告管理',
    content: '## 标题\n ### 标题',
    time: '2020-06-15T06:13:37Z',
    isStick: true,
    isImportant: true,
    announcer: 'Dreace',
  },
];
export default {
  'GET /api/manager/notices': {
    code: 0,
    data: notices,
  },
  'POST /api/manager/notices': (req: Request, res: Response) => {
    notices.push({
      id: notices[notices.length - 1].id + 1,
      announcer: '管理员',
      content: req.body.content,
      isImportant: req.body.isImportant,
      isStick: req.body.isStick,
      time: moment().utc().format(),
      title: req.body.title,
    });
    res.send({
      code: 0,
      data: 'OK',
    });
  },
  'DELETE /api/manager/notices/1': {
    code: 0,
    data: 'OK',
  },
  'PUT /api/manager/notices/1': {
    code: 0,
    data: notices,
  },
};
