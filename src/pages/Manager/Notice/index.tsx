import React, { Component } from 'react';
import { Button, Popconfirm, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { connect } from 'umi';
import { NoticeModelState, Notice } from '@/models/manager/notice';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { ConnectProps } from '@@/plugin-dva/connect';
import EditForm from '@/pages/Manager/Notice/components/EditForm';
import { NoticeParamsType } from '@/services/manager/notice';
import CreateForm, { CreateFormValueType } from './components/CreateForm';

interface NoticeProps extends Partial<ConnectProps> {
  notice: NoticeModelState;
}

interface NoticePageState {
  createModalVisible: boolean;
  editModalVisible: boolean;
  willEditNotice: Notice;
}

class NoticePage extends Component<NoticeProps> {
  state: NoticePageState = {
    createModalVisible: false,
    editModalVisible: false,
    willEditNotice: {
      id: -1,
      title: '',
      content: '',
      time: '',
      isStick: false,
      isImportant: false,
      announcer: '',
    },
  };

  dispatch = this.props.dispatch;

  columns: ProColumns<Notice>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: '标题',
      dataIndex: 'title',
      // width: 400,
    },
    {
      title: '置顶',
      dataIndex: 'isStick',
      initialValue: false,
      width: 100,
      valueEnum: {
        false: { text: '否', status: 'Default' },
        true: { text: '是', status: 'Success' },
      },
    },
    {
      title: '重要',
      dataIndex: 'isImportant',
      initialValue: false,
      width: 100,
      valueEnum: {
        false: { text: '否', status: 'Default' },
        true: { text: '是', status: 'Success' },
      },
    },
    {
      title: '发布时间',
      dataIndex: 'time',
      valueType: 'dateTime',
      width: 300,
    },
    {
      title: '发布人',
      dataIndex: 'announcer',
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
              willEditNotice: record,
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
        type: 'notice/create',
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
        type: 'notice/fetch',
      });
      hide();
    } else {
      hide();
    }
  };

  handleDelete = async (noticeId: number) => {
    const hide = message.loading('正在删除');
    if (this.dispatch) {
      await this.dispatch({
        type: 'notice/delete',
        payload: noticeId,
      });
      hide();
    } else {
      hide();
    }
  };

  handleEdit = async (noticeId: number, values: NoticeParamsType) => {
    const hide = message.loading('正在修改');
    if (this.dispatch) {
      await this.dispatch({
        type: 'notice/edit',
        payload: {
          noticeId,
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
    const { notices: noticeList } = this.props.notice;
    return (
      <PageHeaderWrapper>
        <ProTable<Notice>
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
          dataSource={noticeList}
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
              willEditNotice: {
                id: -1,
                title: '',
                content: '',
                time: '',
                isStick: false,
                isImportant: false,
                announcer: '',
              },
            });
          }}
          onSubmit={(noticeId, values) => {
            this.setState({
              editModalVisible: false,
              willEditNotice: {
                id: -1,
                title: '',
                content: '',
                time: '',
                isStick: false,
                isImportant: false,
                announcer: '',
              },
            });
            this.handleEdit(noticeId, values);
          }}
          editModalVisible={this.state.editModalVisible}
          values={this.state.willEditNotice}
        />
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ notice }: ConnectState) => ({
  notice,
}))(NoticePage);
