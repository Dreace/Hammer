import React, { useState } from 'react';
import { Role } from '@/models/systemManage/role/role';
import { Form, Modal, Input } from 'antd';
import { RoleParamsType } from '@/services/systemMange/role/role';

export interface EditFormProps {
  onCancel: (flag?: boolean, formVals?: RoleParamsType) => void;
  onSubmit: (id: number, values: RoleParamsType) => void;
  editModalVisible: boolean;
  values: Role;
}

const EditForm: React.FC<EditFormProps> = (props) => {
  const [formValues] = useState<RoleParamsType>({
    name: props.values.name,
    chineseName: props.values.chineseName,
    description: props.values.description
  });
  const [form] = Form.useForm();
  form.setFieldsValue(props.values);
  const { onSubmit: handleUpdate, onCancel: handleEditModalVisible, editModalVisible } = props;
  const handleFormUpdate = async () => {
    const fieldsValue = await form.validateFields();
    handleUpdate(props.values.id, { ...formValues, ...fieldsValue });
  };
  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="编辑角色"
      visible={editModalVisible}
      onCancel={() => handleEditModalVisible()}
      onOk={handleFormUpdate}
      afterClose={() => form.resetFields()}
    >
      <Form form={form} initialValues={props.values}>
        <Form.Item label="权限名" name="name" rules={[{ required: true }]}>
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

export default EditForm;
