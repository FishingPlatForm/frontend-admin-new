import React, { useState, useEffect } from "react";
import { message, Space, Table } from 'antd';
import { withRouter } from "react-router-dom";
import { FishPondInformationColumns } from "../../commons/tables";
import { getApprovelistFishpondListAxios, putApproveAxios } from "../../commons/request/fishpond";
const FishPondInformationApprovelist = (props) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    const [tableParams, setTableParams] = useState({
        pagination: { current: 0, pageSize: 10, },
    });
    const fetchData = async () => {
        let res = await getApprovelistFishpondListAxios({
            "ipp": tableParams.pagination.current,
            "page": tableParams.pagination.pageSize
        })
        if (res.success) {
            setData(res.data.fishponds);
            setTotal(res.data.total);
        }
    }
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };
    const btnClick = async (type, item) => {
        switch (type) {
            case "name":
                props.history.push({
                    pathname: `/console/fishpond-detail`,
                    state: item
                })
                break;
            case "ok":
                let resOk = await putApproveAxios({
                    "fishpondid": item.Fishpondid,
                    "status": 2, // 0 下架  1 审批中 2 上架
                })
                if (resOk.success) {
                    message.success(item.Name + "上架成功！");
                    fetchData();
                    return
                }
                message.error(item.Name + "上架失败！")
                break;
            case "reject":
                let resReject = await putApproveAxios({
                    "fishpondid": item.Fishpondid,
                    "status": 0, // 0 下架  1 审批中 2 上架
                })
                if (resReject.success) {
                    message.success(item.Name + "下架成功！");
                    fetchData();
                    return
                }
                message.error(item.Name + "下架失败！")
                break;

            default:
                break;
        }
    }
    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);
    return (
        <Table
            columns={FishPondInformationColumns(props, "approve", btnClick)}
            dataSource={data}
            rowKey={(record) => record.Fishpondid}
        // pagination={{
        //     ...tableParams.pagination,
        //     total:total
        // }}
        // loading={loading}
        // onChange={handleTableChange}
        />
    )
}

export default withRouter(FishPondInformationApprovelist);