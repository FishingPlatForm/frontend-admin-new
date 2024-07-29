import React, { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { getAnnouncementAxios, updateAnnouncementAxios, setAnnouncementAxios } from "../../commons/request/announcement";
const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 4,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 20,
        },
    },
};
const FishpondAnnouncement = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const getData = async () => {
        let res = await getAnnouncementAxios({ type: 1 });
        if (res.success) {
            setData(res.data);
            form.setFieldsValue({ names: res.data.map(item => item.doc) })
        }
    }
    const onFinish = async (values) => {
        if (values) {
            let resDel = await updateAnnouncementAxios({ type: 1 });
            if (resDel.success) {
                for (let item of values.names) {
                    await setAnnouncementAxios({
                        type: 1,
                        doc: item
                    })
                }
                getData()
            }

        }
    };
    useEffect(() => {
        getData()
    }, [])
    return <div style={{ overflowY: "scroll", height: "100%" }}>
        <h3>鱼塘H5 更新公告</h3>
        <Form
            name="dynamic_form_item"
            onFinish={onFinish}
            form={form}

        >
            <Form.List
                name="names"
                rules={[
                    {
                        validator: async (_, names) => {
                            if (!names || names.length < 1) {
                                return Promise.reject(new Error('At least 1 passengers'));
                            }
                        },
                    },
                ]}
            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                label={index + 1}
                                required={false}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input passenger's name or delete this field.",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <TextArea rows={2}
                                        placeholder="请输入..."
                                        style={{
                                            width: '70%',
                                        }}
                                    />
                                </Form.Item>
                                <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => remove(field.name)}
                                />
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{
                                    width: '60%',
                                }}
                                icon={<PlusOutlined />}
                            >
                                添加公告
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    更新
                </Button>
            </Form.Item>
        </Form>
    </div>
}

export default FishpondAnnouncement;