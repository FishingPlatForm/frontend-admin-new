import { Button, Popconfirm } from "antd";
import { orderStatus } from "../utils/helps";
export const FishPondInformationColumns = (props, type, btnClick) => {
    return [
        {
            title: '鱼塘名称',
            dataIndex: 'Name',
            key: 'Name',
            fixed: 'left',
            render: (e, record) => {
                if (type === "all") {
                    return record?.Name;
                }
                return <Button type="link" onClick={() => btnClick("name", record)}>{record?.Name}</Button>
            },
        },
        {
            title: '鱼塘位置',
            dataIndex: 'Place',
            key: 'Place',
        },
        {
            title: '联系方式',
            dataIndex: 'Contact',
            key: 'Contact',
        },
        {
            title: '收费标准',
            dataIndex: 'PriceHour',
            key: 'PriceHour',
            render: (e, record) => {
                return record.Price / 100 + "/" + record.Hour + "h"
            }
        },
        {
            title: '当前收费有效期（日期）',
            dataIndex: 'STimeEndTime',
            key: 'STimeEndTime',
            responsive: ['md'],
            render: (e, record) => {
                return record.STime + "-" + record.EndTime
            }
        },
        {
            title: '提交时间',
            dataIndex: 'CreatedAt',
            responsive: ['md'],
            key: 'CreatedAt',
        },
        {
            title: '鱼塘状态',
            dataIndex: 'Status',
            key: 'Status',
            responsive: ['md'],
            render: (e, record) => {
                switch (record.Status) {
                    case 0:
                        return "下线"
                    case 1:
                        return "待审核"
                    case 2:
                        return "上线"

                    default:
                        break;
                }
            }
        },
        {
            title: '操作',
            dataIndex: 'address',
            key: 'address',
            fixed: 'right',
            render: (e, record) => {
                if (record.Status != 1) {
                    return "—"
                }
                return (
                    <div style={{ display: "flex", alignItems: 'center' }}>
                        <Popconfirm
                            placement="left"
                            title={"是否拒绝"}
                            description={"拒绝后，改鱼塘状态为下架状态"}
                            onConfirm={() => btnClick("reject", record)}
                            okText="确定拒绝"
                            cancelText="取消"
                        >
                            <Button>拒绝</Button>
                        </Popconfirm>
                        <Popconfirm
                            placement="left"
                            title={"确定同意"}
                            description={"再次确认是否同意？"}
                            onConfirm={() => btnClick("ok", record)}
                            okText="确定通过"
                            cancelText="取消"
                        >
                            <Button type="primary">通过</Button>
                        </Popconfirm>
                    </div>
                )
            }
        },
    ];
}
export const MerchantWithdrawalListComponentColumns = (props, type, btnClick) => {
    return [
        {
            title: '订单ID',
            dataIndex: 'Withdrawid',
            key: 'Withdrawid',
            fixed: 'left'
        },
        {
            title: '用户手机号',
            dataIndex: 'Userid',
            key: 'Userid',
        },
        {
            title: '提现申请时间',
            dataIndex: 'CreatedAt',
            key: 'CreatedAt',
        },
        {
            title: '交易流水号',
            dataIndex: 'PriceHour',
            key: 'PriceHour',
            render: (e, record) => {
                return ""
            }
        },
        {
            title: '当前账户余额',
            dataIndex: 'STimeEndTime',
            key: 'STimeEndTime',
            responsive: ['md'],
        },
        {
            title: '本次提现金额',
            dataIndex: 'ReqMoney',
            responsive: ['md'],
            key: 'ReqMoney',
            render: (e, record) => {
                return record.ReqMoney / 100;
            }
        },
        {
            title: '订单状态',
            dataIndex: 'Status',
            key: 'Status',
            responsive: ['md'],
            render: (e, record) => {
                return orderStatus(record.Status)
            }
        },
        {
            title: '操作',
            dataIndex: 'address',
            key: 'address',
            fixed: 'right',
            render: (e, record) => {
                if ([0, "0"].includes(record.Status)) {
                    return <div style={{ display: "flex", alignItems: 'center' }}>
                        <Popconfirm
                            placement="left"
                            title={"是否拒绝"}
                            description={"拒绝后，改提现记录变成已拒绝！"}
                            onConfirm={() => btnClick("reject", record)}
                            okText="确定拒绝"
                            cancelText="取消"
                        >
                            <Button>拒绝</Button>
                        </Popconfirm>
                        <Popconfirm
                            placement="left"
                            title={"确定同意"}
                            description={"再次确认是否同意，同意后状态为打款中？"}
                            onConfirm={() => btnClick("resolve1", record)}
                            okText="确定通过"
                            cancelText="取消"
                        >
                            <Button type="primary" style={{ marginLeft: "10px" }}>审核通过</Button>
                        </Popconfirm>
                    </div>
                } else if ([1, "1"].includes(record.Status)) {
                    return (
                        <div style={{ display: "flex", alignItems: 'center' }}>
                            <Popconfirm
                                placement="left"
                                title={"确定同意"}
                                onConfirm={() => btnClick("resolve2", record)}
                                okText="确定"
                                cancelText="取消"
                            >
                                <Button type="primary">确认已打款</Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        },
    ];
} 