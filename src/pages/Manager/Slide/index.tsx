import React, { Component } from 'react';
import { Button, Popconfirm, message, Popover, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { connect } from 'umi';
import { SlideModelState, Slide } from '@/models/manager/slide';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { ConnectProps } from '@@/plugin-dva/connect';
import { SlideParamsType } from '@/services/manager/slide';
import EditForm from './components/EditForm';
import CreateForm, { CreateFormValueType } from './components/CreateForm';

interface SlideProps extends Partial<ConnectProps> {
  slide: SlideModelState;
}

interface SlidePageState {
  createModalVisible: boolean;
  editModalVisible: boolean;
  willEditSlide: Slide;
}

class SlidePage extends Component<SlideProps> {
  state: SlidePageState = {
    createModalVisible: false,
    editModalVisible: false,
    willEditSlide: {
      id: -1,
      index: 0,
      name: '',
      imageUrl: '',
      content: '',
    },
  };

  dispatch = this.props.dispatch;

  columns: ProColumns<Slide>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '展示排序',
      dataIndex: 'index',
      width: 100,
    },
    {
      title: '图片链接',
      dataIndex: 'imageUrl',
      render: (_, record) => [
        <>
          <Popover content={<Image src={record.imageUrl} />} placement="bottom" trigger="hover">
            <Button type="link" href={record.imageUrl} target="_blank">
              {record.imageUrl}
            </Button>
          </Popover>
        </>,
      ],
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
              willEditSlide: record,
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
        type: 'slide/create',
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
        type: 'slide/fetch',
      });
      hide();
    } else {
      hide();
    }
  };

  handleDelete = async (slideId: number) => {
    const hide = message.loading('正在删除');
    if (this.dispatch) {
      await this.dispatch({
        type: 'slide/delete',
        payload: slideId,
      });
      hide();
    } else {
      hide();
    }
  };

  handleEdit = async (slideId: number, values: SlideParamsType) => {
    const hide = message.loading('正在修改');
    if (this.dispatch) {
      await this.dispatch({
        type: 'slide/edit',
        payload: {
          slideId,
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
    const { slides: slideList } = this.props.slide;
    return (
      <PageHeaderWrapper>
        <ProTable<Slide>
          // actionRef={actionRef}
          columns={this.columns}
          rowKey="id"
          pagination={false}
          options={{
            density: true,
            fullScreen: true,
            reload: () => this.handleFetch(),
            setting: true,
          }}
          search={false}
          dataSource={slideList}
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
              willEditSlide: {
                id: -1,
                index: 0,
                name: '',
                imageUrl: '',
                content: '',
              },
            });
          }}
          onSubmit={(slideId, values) => {
            this.setState({
              editModalVisible: false,
              willEditSlide: {
                id: -1,
                index: 0,
                name: '',
                imageUrl: '',
                content: '',
              },
            });
            this.handleEdit(slideId, values);
          }}
          editModalVisible={this.state.editModalVisible}
          values={this.state.willEditSlide}
        />
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ slide }: ConnectState) => ({
  slide,
}))(SlidePage);
