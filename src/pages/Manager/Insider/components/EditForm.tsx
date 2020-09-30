import React, { useState } from 'react';
import { Insider } from '@/models/manager/insider';
import { Form, Modal, Input, DatePicker, Radio } from 'antd';
import moment from 'moment';
import { disabledDate } from './CreateForm';

export interface EditFormValueType {
  expireAt: number;
  status: number;
}

export interface EditFormProps {
  onCancel: (flag?: boolean, formVals?: EditFormValueType) => void;
  onSubmit: (insiderId: string, values: EditFormValueType) => void;
  editModalVisible: boolean;
  values: Insider;
}

const EditForm: React.FC<EditFormProps> = (props) => {
  const [formValues] = useState<EditFormValueType>({
    expireAt: props.values.expireAt,
    status: props.values.status,
  });
  const [form] = Form.useForm();
  const status = props.values.status === -2 ? 0 : props.values.status;
  form.setFieldsValue({
    ...props.values,
    expireAt: moment(props.values.expireAt),
    status: status.toString(),
  });
  const { onSubmit: handleUpdate, onCancel: handleEditModalVisible, editModalVisible } = props;
  const handleFormUpdate = async () => {
    const fieldsValue = await form.validateFields();
    if (fieldsValue.expireAt) {
      fieldsValue.expireAt = moment(fieldsValue.expireAt).valueOf();
    }
    handleUpdate(props.values.openId, { ...formValues, ...fieldsValue });
  };
  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="编辑内测用户信息"
      visible={editModalVisible}
      onCancel={() => handleEditModalVisible()}
      onOk={handleFormUpdate}
      afterClose={() => form.resetFields()}
    >
      <Form form={form} labelCol={{ span: 4 }}>
        <Form.Item label="OpenID" name="openId">
          <Input disabled />
        </Form.Item>
        <Form.Item label="激活码" name="key">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="expireAt"
          label="过期时间"
          rules={[
            {
              type: 'object',
              required: true,
              message: '请选择过期时间',
            },
          ]}
        >
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            disabledDate={disabledDate}
            showTime={{ defaultValue: moment() }}
          />
        </Form.Item>
        <Form.Item
          name="status"
          label="状态"
          rules={[{ required: true, message: '请选择一个初始状态' }]}
        >
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="-1">注销</Radio.Button>
            <Radio.Button value="0">常规</Radio.Button>
            <Radio.Button value="1">永久</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditForm;
