import React, { Component } from 'react';
import { Button, Popconfirm, message, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { connect } from 'umi';
import { InsiderModelState, Insider } from '@/models/manager/insider';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { ConnectProps } from '@@/plugin-dva/connect';
import moment from 'moment';
import EditForm, { EditFormValueType } from './components/EditForm';
import CreateForm, { CreateFormValueType } from './components/CreateForm';

interface InsiderProps extends Partial<ConnectProps> {
  insider: InsiderModelState;
}

interface InsiderPageState {
  createModalVisible: boolean;
  editModalVisible: boolean;
  willEditInsider: Insider;
}

const statusMap = {
  '-2': <Tag color="red">过期</Tag>,
  '-1': <Tag color="red">注销</Tag>,
  '0': <Tag color="blue">常规</Tag>,
  '1': <Tag color="green">永久</Tag>,
};

class InsiderPage extends Component<InsiderProps> {
  state: InsiderPageState = {
    createModalVisible: false,
    editModalVisible: false,
    willEditInsider: {
      openId: '',
      key: '',
      expireAt: 0,
      status: 0,
    },
  };

  dispatch = this.props.dispatch;

  columns: ProColumns<Insider>[] = [
    {
      title: 'OpenID',
      dataIndex: 'openId',
      width: 300,
    },
    {
      title: '激活码',
      dataIndex: 'key',
    },
    {
      title: '过期时间',
      dataIndex: 'isStick',
      render: (_, record) => [
        <>{record.status === 1 ? '-' : moment(record.expireAt).format('YYYY-MM-DD HH:mm:ss')}</>,
      ],
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, record) => [<>{statusMap[record.status]}</>],
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
              willEditInsider: record,
              editModalVisible: true,
            });
          }}
        >
          编辑
        </a>,
        <Popconfirm title="确认删除？" onConfirm={() => this.handleDelete(record.openId)}>
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
        type: 'insider/create',
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
        type: 'insider/fetch',
      });
      hide();
    } else {
      hide();
    }
  };

  handleDelete = async (insiderId: string) => {
    const hide = message.loading('正在删除');
    if (this.dispatch) {
      await this.dispatch({
        type: 'insider/delete',
        payload: insiderId,
      });
      hide();
    } else {
      hide();
    }
  };

  handleEdit = async (insiderId: string, values: EditFormValueType) => {
    const hide = message.loading('正在修改');
    if (this.dispatch) {
      await this.dispatch({
        type: 'insider/edit',
        payload: {
          insiderId,
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
    const { insiders: insiderList } = this.props.insider;
    return (
      <PageHeaderWrapper>
        <ProTable<Insider>
          // actionRef={actionRef}
          columns={this.columns}
          rowKey="openId"
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
          dataSource={insiderList}
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
              willEditInsider: {
                openId: '',
                key: '',
                expireAt: 0,
                status: 0,
              },
            });
          }}
          onSubmit={(insiderId, values) => {
            this.setState({
              editModalVisible: false,
              willEditInsider: {
                openId: '',
                key: '',
                expireAt: 0,
                status: 0,
              },
            });
            this.handleEdit(insiderId, values);
          }}
          editModalVisible={this.state.editModalVisible}
          values={this.state.willEditInsider}
        />
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ insider }: ConnectState) => ({
  insider,
}))(InsiderPage);
