import React, { Component } from 'react';
import { Button, Popconfirm, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { connect } from 'umi';
import { RoleModelState, Role } from '@/models/systemManage/role/role';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { ConnectProps } from '@@/plugin-dva/connect';
import { RoleParamsType } from '@/services/systemMange/role/role';
import EditForm from './components/EditForm';
import CreateForm, { CreateFormValueType } from './components/CreateForm';

interface RoleProps extends Partial<ConnectProps> {
  role: RoleModelState;
}

interface RolePageState {
  createModalVisible: boolean;
  editModalVisible: boolean;
  willEditRole: Role; // 与model中的数据对应
}

class RolePage extends Component<RoleProps> {
  state: RolePageState = {
    createModalVisible: false,
    editModalVisible: false,
    willEditRole: {
      id: -1,
      name: '',
      chineseName: '',
      description: '',
      createTime: '',
    },
  };

  dispatch = this.props.dispatch;

  columns: ProColumns<Role>[] = [
    {
      title: '权限名',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: '权限中文名',
      dataIndex: 'chineseName',
      width: 200,
    },
    {
      title: '权限描述',
      dataIndex: 'description',
      width: 300,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      width: 200,
    },
    {
      title: '操作',
      key: 'option',
      width: 150,
      valueType: 'option',
      render: (_, record) => [
        <a
          onClick={() => {
            this.setState({
              willEditRole: record,
              editModalVisible: true,
            });
          }}
        >
          编辑
        </a>,
        <Popconfirm title="确认删除？" onConfirm={() => this.handleDelete(record.id)}>
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  componentDidMount() {
    this.handleFetch();
  }

  handleAdd = async (fields: CreateFormValueType) => {
    const hide = message.loading('正在添加');
    if (this.dispatch) {
      await this.dispatch({
        type: 'role/create',
        payload: fields,
      });
      hide();
      this.setState({
        createModalVisible: false,
      });
    } else {
      hide();
    }
  };

  handleFetch = async () => {
    const hide = message.loading('加载中');
    if (this.dispatch) {
      await this.dispatch({
        type: 'role/fetch',
      });
      hide();
    } else {
      hide();
    }
  };

  handleDelete = async (id: number) => {
    const hide = message.loading('正在删除');
    if (this.dispatch) {
      await this.dispatch({
        type: 'role/delete',
        payload: id,
      });
      hide();
    } else {
      hide();
    }
  };

  handleEdit = async (id: number, values: RoleParamsType) => {
    const hide = message.loading('正在修改');
    if (this.dispatch) {
      await this.dispatch({
        type: 'role/edit',
        payload: {
          id,
          values,
        },
      });
      hide();
    } else {
      hide();
    }
  };

  render() {
    // const actionRef = useRef<ActionType>();
    const { roles: roleList } = this.props.role;
    return (
      <PageHeaderWrapper>
        <ProTable<Role>
          // actionRef={actionRef}
          columns={this.columns}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
          }}
          options={{
            density: true,
            fullScreen: true,
            reload: () => this.handleFetch(),
            setting: true,
          }}
          search={false}
          dataSource={roleList}
          toolBarRender={() => [
            <Button
              key="3"
              type="primary"
              onClick={() => this.setState({ createModalVisible: true })}
            >
              <PlusOutlined />
              新建
            </Button>,
          ]}
        />
        <CreateForm
          onCancel={() => this.setState({ createModalVisible: false })}
          onSubmit={(values) => this.handleAdd(values)}
          updateModalVisible={this.state.createModalVisible}
        />
        <EditForm
          onCancel={() => {
            this.setState({
              editModalVisible: false,
              willEditRole: {
                id: -1,
                name: '',
                chineseName: '',
                description: '',
                createTime: '',
              },
            });
          }}
          onSubmit={(id, values) => {
            this.setState({
              editModalVisible: false,
              willEditRole: {
                id: -1,
                name: '',
                chineseName: '',
                description: '',
                createTime: '',
              },
            });
            this.handleEdit(id, values);
          }}
          editModalVisible={this.state.editModalVisible}
          values={this.state.willEditRole}
        />
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ role }: ConnectState) => ({
  role,
}))(RolePage);
