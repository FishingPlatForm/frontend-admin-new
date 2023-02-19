

import React from 'react';
import { AppstoreOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, } from '@ant-design/icons';
import HomeComponent from "./views/fishpond/FishPondInformation";
import HomeApprovelistComponent from "./views/fishpond/FishPondInformationApprovelist";
import FishPondInformationDetailComponent from "./views/fishpond/FishPondInformationDetail";
import MerchantWithdrawalListComponent from "./views/withdraw/MerchantWithdrawalList";
const routeList = [
    { "key": "fishpond", "icon": <AppstoreOutlined />, link: "/console/home", component: HomeComponent, "label": "鱼塘资料(包含删除的鱼塘)", "type": "fishpond" },
    { "key": "fishpond-approvelist", "icon": <ContainerOutlined />, link: "/console/approvelist", component: HomeApprovelistComponent, "label": "鱼塘审核(待审核列表)", "type": "fishpond-approvelist" },
    { hidden: true, "key": "fishpond-detail", "icon": <PieChartOutlined />, link: "/console/fishpond-detail", component: FishPondInformationDetailComponent, "label": "鱼塘详情", "type": "fishpond-detail" },

    { "key": "merchant_withdrawal_list", "icon": <PieChartOutlined />, link: "/console/merchant-withdrawal-list", component: MerchantWithdrawalListComponent, "label": "商户提现列表", "type": "merchant_withdrawal_list" },

];

export default routeList;