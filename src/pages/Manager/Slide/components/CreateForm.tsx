import React, { useState } from 'react';
import { Slide } from '@/models/manager/slide';
import { Form, Modal, Input, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';

export interface CreateFormValueType extends Partial<Slide> {
  index: number;
  name: string;
  imageUrl: string;
  content: string;
}

export interface CreateFormProps {
  onCancel: (flag?: boolean, formVals?: CreateFormValueType) => void;
  onSubmit: (values: CreateFormValueType) => void;
  updateModalVisible: boolean;
  // values: Partial<Slide>;
}

const createFormInitialValues: CreateFormValueType = {
  index: 0,
  name: '',
  imageUrl: '',
  content: '',
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
      title="增加轮播图"
      visible={updateModalVisible}
      onCancel={() => handleCreateModalVisible()}
      onOk={handleFormUpdate}
      afterClose={() => form.resetFields()}
    >
      <Form form={form} initialValues={createFormInitialValues} labelCol={{ span: 4 }}>
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="展示排序" name="index" rules={[{ type: 'number', required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="图片地址" name="imageUrl" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="内容" name="content" rules={[{ required: true }]}>
          <TextArea rows={6} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;
