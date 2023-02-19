import React, { useState, useEffect } from "react";
import { Space, Table, Tag } from 'antd';

import { FishPondInformationColumns } from "../../commons/tables";
import { getFishpondListAxios } from "../../commons/request/fishpond";
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
        if(res.success){
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
    const btnClick = (type)=>{
    }
    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);
    console.log(data)
    return (
        <Table
            columns={FishPondInformationColumns(props,"all",btnClick)}
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