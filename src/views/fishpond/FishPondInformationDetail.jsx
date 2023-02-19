import React, { memo } from "react";
import { Breadcrumb, Col, Divider, Row, Space, Tag, Button, Popconfirm, message } from 'antd';
import { putApproveAxios } from "../../commons/request/fishpond";
import { withRouter } from "react-router-dom";
const style = {
    padding: '8px 0',
};
const color = ["#f50", "#2db7f5", "#87d068", "#108ee9", "purple", "geekblue", "blue", "cyan"]
const FishPondInformationDetailComponent = (props) => {
    const data = props.location.state;
    console.log(data)
    const btnClick = async (type) => {
        switch (type) {
            case "ok":
                let resOk = await putApproveAxios({
                    "fishpondid": data.Fishpondid,
                    "status": 2, // 0 下架  1 审批中 2 上架
                })
                if (resOk.success) {
                    message.success(data.Name + "上架成功！");
                    props.history.goBack(-1);
                    return
                }
                message.error(data.Name + "上架失败！")
                break;
            case "reject":
                let resReject = await putApproveAxios({
                    "fishpondid": data.Fishpondid,
                    "status": 0, // 0 下架  1 审批中 2 上架
                })
                if (resReject.success) {
                    message.success(data.Name + "下架成功！");
                    props.history.goBack(-1);
                    return
                }
                message.error(data.Name + "下架失败！")
                break;

            default:
                break;
        }
    }
    return (
        <>
            <Breadcrumb style={{ paddingBottom: "30px", borderBottom: "1px solid #eee" }}>
                <Breadcrumb.Item>
                    <a href={window.location.origin + "/console/approvelist"}>Home</a>
                </Breadcrumb.Item>

                <Breadcrumb.Item>{data.Name}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ overflowY: "scroll", overflowX: "hidden", width: "100%", height: "90%", }}>
                <Divider orientation="left">基本信息</Divider>
                <Row gutter={[16, 24]}>
                    <Col className="gutter-row" span={6}>
                        <div style={style}>
                            鱼塘名称：{data.Name}
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={style}>
                            鱼塘位置：Latitude-{data.Latitude} - Longitude:{data.Longitude}
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={style}>
                            详细地址补充：{data.Place}
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={style}>
                            <div style={style}>
                                联系方式{data.Contact}
                            </div>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={style}>
                            <div style={style}>
                                营业时间：{data.OpenTime}-{data.OverTime}
                            </div>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={style}>
                            <div style={style}>
                                钓位数：{data.SeatNum}
                            </div>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={style}>
                            <div style={style}>
                                钓场类型：{data.FishpondType}
                            </div>
                        </div>
                    </Col>
                </Row>
                <Divider orientation="left">收费标准</Divider>
                <Row gutter={[16, 24]}>
                    <Col className="gutter-row" span={6}>
                        <div style={style}>
                            收费类型：小时
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={style}>
                            收费金额：￥{data.Price / 100}/{data.Hour}h
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={style}>
                            开始时间-结束时间：{data.STime}-{data.EndTime}
                        </div>
                    </Col>
                </Row>
                <Divider orientation="left">活动说明</Divider>
                <Row gutter={[16, 24]}>
                    <Col className="gutter-row" span={18}>
                        <div style={style}>
                            {data.Content}
                        </div>
                    </Col>
                </Row>
                <Divider orientation="left">回鱼收费标准</Divider>
                <Row gutter={[16, 24]}>
                    <Col className="gutter-row" span={18}>
                        <div style={style}>
                            {data.BuyFish}
                        </div>
                    </Col>
                </Row>
                <Divider orientation="left">钓场规则</Divider>
                <Row gutter={[16, 24]}>
                    <Col className="gutter-row" span={18}>
                        <div style={style}>
                            {data.Rule}
                        </div>
                    </Col>
                </Row>
                <Divider orientation="left">鱼类</Divider>
                <Row gutter={[16, 24]}>
                    <Col className="gutter-row" span={18}>
                        <div style={style}>
                            {data.Fish}
                        </div>
                    </Col>
                </Row>
                <Divider orientation="left">鱼塘相册</Divider>
                <Row gutter={[16, 24]}>
                    <Col className="gutter-row" span={18}>
                        <div style={{ display: 'flex', flexWrap: "wrap" }}>
                            {
                                data.Urls.map((item, index) => {
                                    return <div key={index} style={{ padding: "20px" }}> <img src={item} style={{ width: "200px" }} /></div>
                                })
                            }
                        </div>
                    </Col>
                </Row>
                <Divider orientation="left">鱼塘标签（不超过3个）</Divider>
                <Row gutter={[16, 24]}>
                    <Col className="gutter-row" span={18}>
                        <div style={style}>
                            <Space size={[0, 8]} wrap>
                                {
                                    data.Tags.map((item, index) => {
                                        return <Tag color={color[Math.floor(Math.random() * color.length + 1)]}>{item}</Tag>
                                    })
                                }
                            </Space>
                        </div>
                    </Col>
                </Row>
                <Row gutter={[16, 24]} style={{ height:"100px",paddingBottom:"30px" }} align='middle'>
                    <Col className="gutter-row" span={4}>
                        <Popconfirm
                            placement="left"
                            title={"是否拒绝"}
                            description={"拒绝后，改鱼塘状态为下架状态"}
                            onConfirm={() => btnClick("reject")}
                            okText="确定拒绝"
                            cancelText="取消"
                        >
                            <Button>拒绝</Button>
                        </Popconfirm>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <Popconfirm
                            placement="left"
                            title={"确定同意"}
                            description={"再次确认是否同意？"}
                            onConfirm={() => btnClick("ok")}
                            okText="确定通过"
                            cancelText="取消"
                        >
                            <Button type="primary">通过</Button>
                        </Popconfirm>
                    </Col>
                </Row>

            </div>
        </>
    )
}
export default memo(withRouter(FishPondInformationDetailComponent));