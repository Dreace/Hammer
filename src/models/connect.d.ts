import { MenuDataItem } from '@ant-design/pro-layout';
import { LogLine } from '@/models/dashboard/log';
import { NoticeModelState } from '@/models/manager/notice';
import { RoleModelState } from '@/models/systemManage/role/role';
import { InsiderModelState } from '@/models/manager/insider';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { UserModelState } from './user';
import { StateType } from './login';

export { GlobalModelState, SettingModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;
  login: StateType;
  log: LogLine[];
  notice: NoticeModelState;
  role: RoleModelState;
  insider: InsiderModelState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
