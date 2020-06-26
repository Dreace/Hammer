import React, { useState } from 'react';
import { Notice } from '@/models/manager/notice';
import { Form, Modal, Input, Switch } from 'antd';

export interface CreateFormValueType extends Partial<Notice> {
  title: string;
  content: string;
  isStick: boolean;
  isImportant: boolean;
}

export interface CreateFormProps {
  onCancel: (flag?: boolean, formVals?: CreateFormValueType) => void;
  onSubmit: (values: CreateFormValueType) => void;
  updateModalVisible: boolean;
  // values: Partial<Notice>;
}

const createFormInitialValues: CreateFormValueType = {
  title: '',
  content: '',
  isStick: false,
  isImportant: false,
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [formValues] = useState<CreateFormValueType>(createFormInitialValues);

  const [form] = Form.useForm();

  const { onSubmit: handleUpdate, onCancel: handleCreateModalVisible, updateModalVisible } = props;
  const handleFormUpdate = async () => {
    const fieldsValue = await form.validateFields();
    handleUpdate({ ...formValues, ...fieldsValue });
  };
  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="发布新公告"
      visible={updateModalVisible}
      onCancel={() => handleCreateModalVisible()}
      onOk={handleFormUpdate}
      afterClose={() => form.resetFields()}
    >
      <Form form={form} initialValues={createFormInitialValues}>
        <Form.Item label="标题" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="内容" name="content" rules={[{ required: true }]}>
          <Input.TextArea rows={8} />
        </Form.Item>
        <Form.Item name="isStick" label="置顶" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="isImportant" label="重要" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;
