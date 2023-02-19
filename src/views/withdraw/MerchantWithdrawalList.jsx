import React, { useState, useEffect } from "react";
import { Row, Col, Table, Form, Select, Button, message, Modal, Input } from 'antd';

import { MerchantWithdrawalListComponentColumns } from "../../commons/tables";
import { getWithdrawListAxios, putWithdrawApproveAxios } from "../../commons/request/withdraw";
const { Option } = Select;
const { TextArea } = Input;

const MerchantWithdrawalListComponent = (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [status, setStatus] = useState("0");
    const [total, setTotal] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValue, setFormValue] = useState("");
    const [form] = Form.useForm();
    const nameValue = Form.useWatch('status', form);

    // form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
    const [tableParams, setTableParams] = useState({
        pagination: { current: 0, pageSize: 1000000, },
    });
    const fetchData = async (value) => {
        let res = await getWithdrawListAxios({
            "ipp": tableParams.pagination.current,
            "page": tableParams.pagination.pageSize,
            "status": parseInt(value ?? status)
        })
        setLoading(false)
        if (res.success) {
            setData(res.data.withdraws);
            setTotal(res.data.total);
        }
    }
    const handleTableChange = (pagination, filters, sorter) => {
        let newData = { ...pagination, current: pagination.current - 1 }
        setTableParams({
            pagination: newData,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (newData.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };
    const btnClick = async (type, record) => {
        console.log(type,record)
        switch (type) {
            case "reject":
                setIsModalOpen({ "status": 2,  "withdrawid": record.Withdrawid })
                break;
            case "resolve2":
                setIsModalOpen({ "status": 3,  "withdrawid": record.Withdrawid })
                break;
            case "resolve1":
                let rejectRes = await putWithdrawApproveAxios({
                    "status": 1,
                    "withdrawid": record.Withdrawid,
                    "note": ""
                })
                if (rejectRes.success) {
                    message.success("申请同意成功！");
                    fetchData()
                    return
                }
                message.error("申请同意失败！")
                break;

            default:
                break;
        }
    }
    const onFinish = (e) => {
        fetchData(e.status)
    }
    const onFinishFailed = () => { }
    const handleOk = async () => {
        if( isModalOpen.status===3 && formValue.length===0 ){
            message.warning("请输入流水单号");
            return
        }
        let rejectRes = await putWithdrawApproveAxios({
            "status": isModalOpen.status,
            "withdrawid": isModalOpen.withdrawid,
            "note": formValue
        })
        if (rejectRes.success) {
            message.success("操作成功！");
            fetchData();
            handleCancel()
            return
        }
        message.error("拒绝 提现失败！")
    }
    const handleCancel = () => {
        setFormValue("");
        setIsModalOpen(false)
    }
    useEffect(() => {
        setStatus(nameValue)
    }, [nameValue])
    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);
    console.log()
    return (
        <Row>
            <Col span={24}>
                <Form
                    name="basic"
                    form={form}
                    layout={"inline"}
                    initialValues={{ status: status }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item name="status" label="提现状态" style={{ width: "300px" }} rules={[{ required: true }]}>
                        <Select >
                            <Option value="0">申请中</Option>
                            <Option value="1">打款中</Option>
                            <Option value="3">已完成</Option>
                            <Option value="2">提现拒绝</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    </Form.Item>
                </Form>
            </Col>

            <Col span={24}>
                {
                    !loading && (
                        <Table
                            size="small"
                            columns={MerchantWithdrawalListComponentColumns(props, "all", btnClick)}
                            dataSource={data}
                            rowKey={(record) => record.Withdrawid}
                            pagination={{
                                current: tableParams.pagination.current + 1,
                                pageSize: tableParams.pagination.pageSize,
                                total: total
                            }}
                            loading={loading}
                            onChange={handleTableChange}
                            scroll={{ x: 1500, y: 600 }}
                        />
                    )
                }
            </Col>
            <Modal title="Basic Modal" open={Boolean(isModalOpen)} onOk={handleOk} onCancel={handleCancel}>
                <TextArea rows={4} placeholder="请输入理由" maxLength={6} value={formValue} onChange={(e) => setFormValue(e.target.value)} />

            </Modal>
        </Row>

    )
}

export default MerchantWithdrawalListComponent;