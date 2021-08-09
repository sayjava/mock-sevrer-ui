import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Input, Button, Space } from 'antd'

export default ({ fieldName }) => {
    return (
        <Form.List name={fieldName}>
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <Space
                            key={key}
                            style={{ display: 'flex', marginBottom: 8 }}
                            align="baseline"
                        >
                            <Form.Item
                                {...restField}
                                name={[name, 'name']}
                                fieldKey={[fieldKey, name]}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Missing name field',
                                    },
                                ]}
                            >
                                <Input placeholder="Name" />
                            </Form.Item>

                            <Form.Item
                                {...restField}
                                name={[name, 'values']}
                                fieldKey={[fieldKey, 'values']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Missing values',
                                    },
                                ]}
                            >
                                <Input placeholder="Comma separated values" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                    ))}
                    <Form.Item>
                        <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                        >
                            {' '}
                            Add field{' '}
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
    )
}
