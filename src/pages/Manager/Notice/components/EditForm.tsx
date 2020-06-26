import React, { useState } from 'react';
import { Notice } from '@/models/manager/notice';
import { Form, Modal, Input, Switch } from 'antd';
import { NoticeParamsType } from '@/services/manager/notice';

export interface EditFormProps {
  onCancel: (flag?: boolean, formVals?: NoticeParamsType) => void;
  onSubmit: (noticeId: number, values: NoticeParamsType) => void;
  editModalVisible: boolean;
  values: Notice;
}

const EditForm: React.FC<EditFormProps> = (props) => {
  const [formValues] = useState<NoticeParamsType>({
    title: props.values.title,
    content: props.values.content,
    isImportant: props.values.isImportant,
    isStick: props.values.isStick,
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
      title="编辑公告"
      visible={editModalVisible}
      onCancel={() => handleEditModalVisible()}
      onOk={handleFormUpdate}
      afterClose={() => form.resetFields()}
    >
      <Form form={form} initialValues={props.values}>
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

export default EditForm;
