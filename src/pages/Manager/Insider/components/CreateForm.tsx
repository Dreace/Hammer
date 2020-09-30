import React, { useState } from 'react';
import { DatePicker, Form, Modal, Input, Radio } from 'antd';
import moment from 'moment';

export interface CreateFormValueType {
  openId: string;
  expireAt: number;
  status: string;
}

export interface CreateFormProps {
  onCancel: (flag?: boolean, formVals?: CreateFormValueType) => void;
  onSubmit: (values: CreateFormValueType) => void;
  updateModalVisible: boolean;
  // values: Partial<Notice>;
}

const createFormInitialValues: CreateFormValueType = {
  openId: '',
  expireAt: 0,
  status: '0',
};

export function disabledDate(current: any) {
  // Can not select days before today and today
  return current && current < moment().add(-1, 'days');
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [formValues] = useState<CreateFormValueType>(createFormInitialValues);

  const [form] = Form.useForm();

  const { onSubmit: handleUpdate, onCancel: handleCreateModalVisible, updateModalVisible } = props;
  const handleFormUpdate = async () => {
    const fieldsValue = await form.validateFields();
    if (fieldsValue.expireAt) {
      fieldsValue.expireAt = moment(fieldsValue.expireAt).valueOf();
    }
    handleUpdate({ ...formValues, ...fieldsValue });
  };
  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="增加内测用户"
      visible={updateModalVisible}
      onCancel={() => handleCreateModalVisible()}
      onOk={handleFormUpdate}
      afterClose={() => form.resetFields()}
    >
      <Form form={form} initialValues={createFormInitialValues} labelCol={{ span: 4 }}>
        <Form.Item label="OpenID" name="openId" rules={[{ required: true }]}>
          <Input />
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

export default CreateForm;
