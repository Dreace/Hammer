import { LogLine } from '@/models/dashboard/log';
import React from 'react';
import { List } from 'antd';
import styles from '@/pages/DashBoard/Log/index.less';

const levelColor = {
  DEBUG: '#111111',
  INFO: '#006600',
  WARNING: '#FF9900',
  ERROR: '#FF3300',
  FATAL: '#990000',
};

interface LogLineItemProps {
  logLine: LogLine;
}

const LoginLineItem: React.FC<LogLineItemProps> = (props) => {
  const color = levelColor[props.logLine.level];
  const item = props.logLine;
  return (
    <List.Item className={styles.listItem} style={{ color }}>
      {`[${new Date(item.time).toLocaleString()}] ${item.level} ${item.message.replace(/\\n/, '\n')}`}
    </List.Item>
  );
};

export default LoginLineItem;
