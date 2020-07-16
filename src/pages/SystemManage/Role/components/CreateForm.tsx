import React, { useState } from 'react';
import { Role } from '@/models/systemManage/role/role';
import { Form, Modal, Input } from 'antd';

export interface CreateFormValueType extends Partial<Role> {
  name: string;
  chineseName: string;
  description: string;
}

export interface CreateFormProps {
  onCancel: (flag?: boolean, formVals?: CreateFormValueType) => void;
  onSubmit: (values: CreateFormValueType) => void;
  updateModalVisible: boolean;
  // values: Partial<Role>;
}

const createFormInitialValues: CreateFormValueType = {
  name: '',
  chineseName: '',
  description: ''
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [formValues] = useState<CreateFormValueType>(createFormInitialValues);

  const [form] = Form.useForm();

  const { onSubmit: handleUpdate, onCancel: handleCreateModalVisible, updateModalVisible } = props;
  const handleFormUpdate = async () => {
    const fieldsValue = await form.validateFields();
    handleUpdate({ ...formValues, ...fieldsValue });
  };

  const checkRoleName = (rule: any, value: { number: number; }) => {
    const reg = /^[a-zA-Z_]{1,}$/
    // @ts-ignore
    if (value && reg.test(value) ) { // 校验条件自定义
      return Promise.resolve();
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('权限名为字母加下划线');
  }

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="添加新权限"
      visible={updateModalVisible}
      onCancel={() => handleCreateModalVisible()}
      onOk={handleFormUpdate}
      afterClose={() => form.resetFields()}
    >
      <Form form={form} initialValues={createFormInitialValues}>
        <Form.Item label="权限名" name="name" rules={[{ required: true, validator: checkRoleName }]}>
          <Input />
        </Form.Item>
        <Form.Item label="中文名" name="chineseName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="权限描述" name="description">
          <Input.TextArea rows={8} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;
