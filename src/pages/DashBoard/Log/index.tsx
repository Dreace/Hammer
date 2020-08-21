// TODO Need e2e test
import React, { Component } from 'react';
import { List, Radio, Button } from 'antd';
import { connect } from 'umi';
import { LogLine } from '@/models/dashboard/log';
import { ConnectState } from '@/models/connect';
import { ConnectProps } from '@@/plugin-dva/connect';
import LoginLineItem from '@/pages/DashBoard/Log/components/LogLineItem';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { RadioChangeEvent } from 'antd/lib/radio';
import styles from './index.less';

interface LogProps extends Partial<ConnectProps> {
  log: LogLine[];
}

class Log extends Component<LogProps> {
  state = {
    sort: 'asc',
  };

  private timerID: NodeJS.Timer | null = null;

  componentDidMount() {
    this.refreshLog();
  }

  componentWillUnmount(): void {
    if (this.timerID) {
      clearInterval(this.timerID);
    }
  }

  handleSortChange = (event: RadioChangeEvent) => {
    this.setState({
      sort: event.target.value,
    });
    this.refreshLog();
  };

  handleRefreshIntervalChange = (event: RadioChangeEvent) => {
    if (this.timerID) {
      clearInterval(this.timerID);
      this.timerID = null;
    }
    if (event.target.value === '0') {
      return;
    }
    this.timerID = setInterval(
      () => this.refreshLog(),
      Number.parseInt(event.target.value, 10) * 1000,
    );
  };

  refreshLog = () => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'log/fetch',
      });
    }
  };

  render(): React.ReactNode {
    const data = this.props.log;
    return (
      <PageHeaderWrapper>
        <div className={styles.controlBar}>
          刷新间隔：
          <Radio.Group
            className={styles.controlBarItem}
            defaultValue="0"
            onChange={this.handleRefreshIntervalChange}
          >
            <Radio.Button value="0">永不</Radio.Button>
            <Radio.Button value="1">1 秒</Radio.Button>
            <Radio.Button value="5">5 秒</Radio.Button>
            <Radio.Button value="10">10 秒</Radio.Button>
          </Radio.Group>
          时间：
          <Radio.Group
            className={styles.controlBarItem}
            defaultValue="asc"
            onChange={this.handleSortChange}
          >
            <Radio.Button value="asc">升序</Radio.Button>
            <Radio.Button value="dsc">降序</Radio.Button>
          </Radio.Group>
          <Button className={styles.controlBarItem} type="primary" onClick={this.refreshLog}>
            刷新
          </Button>
        </div>
        <List
          className={styles.list}
          dataSource={this.state.sort === 'asc' ? data.reverse() : data}
          renderItem={(item) => <LoginLineItem logLine={item} />}
        />
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ log }: ConnectState) => ({
  log,
}))(Log);
