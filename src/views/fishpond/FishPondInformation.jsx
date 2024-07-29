import React, { useState, useEffect } from "react";
import { Space, Table, message } from 'antd';

import { FishPondInformationColumns } from "../../commons/tables";
import { getFishpondListAxios, postAdminOffAxios, fishpondAdminExposureOnAxios,fishpondAdminExposureOffAxios } from "../../commons/request/fishpond";
const FishPondInformation = (props) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    const [tableParams, setTableParams] = useState({
        pagination: { current: 0, pageSize: 10, },
    });
    const fetchData = async () => {
        let res = await getFishpondListAxios({
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
    const btnClick = async (type, record) => {
        switch (type) {
            case "reject":
                let resReject = await postAdminOffAxios({
                    "fishpondid": record.Fishpondid,
                    "status": 0, // 0 下架  1 审批中 2 上架
                })
                if (resReject.success) {
                    message.success(record.Name + "下架成功！");
                    fetchData();
                    return
                }
                message.error(record.Name + "下架失败！")
                break;
            case "exposure":
                let resExposure = await fishpondAdminExposureOnAxios({
                    "fishpondid": record.Fishpondid,
                })
                if (resExposure.success) {
                    message.success(record.Name + "曝光成功！");
                    fetchData();
                    return
                }
                message.error(record.Name + "曝光失败！");
                break;
            case "offExposure":
                let resOffExposure = await fishpondAdminExposureOffAxios({
                    "fishpondid": record.Fishpondid,
                })
                if (resOffExposure.success) {
                    message.success(record.Name + "曝光下架成功！");
                    fetchData();
                    return;
                }
                message.error(record.Name + "曝光下架失败！")
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
            columns={FishPondInformationColumns(props, "all", btnClick)}
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

export default FishPondInformation;