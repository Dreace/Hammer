import React, { useState } from 'react';
import { Slide } from '@/models/manager/slide';
import { Form, Modal, Input, InputNumber } from 'antd';
import { SlideParamsType } from '@/services/manager/slide';
import TextArea from 'antd/es/input/TextArea';

export interface EditFormProps {
  onCancel: (flag?: boolean, formVals?: SlideParamsType) => void;
  onSubmit: (slideId: number, values: SlideParamsType) => void;
  editModalVisible: boolean;
  values: Slide;
}

const EditForm: React.FC<EditFormProps> = (props) => {
  const [formValues] = useState<SlideParamsType>({
    index: props.values.index,
    name: props.values.name,
    imageUrl: props.values.imageUrl,
    content: props.values.content,
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
      <Form form={form} labelCol={{ span: 4 }}>
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

export default EditForm;
