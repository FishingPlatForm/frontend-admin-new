export const orderStatus = (status) => {
    // 提现申请
    // WITHDRAW STATUS CREATED = O
    // //提现通过(打款中 )
    // WITHDRAW STATUS PASS 1
    // // 提现拒绝
    // WITHDRAW STATUS REFUSE = 2
    // //提现完成(已打款)
    // WITHDRAW STATUS OVER = 3
    switch (status) {
        case "0":
        case 0:
            return "申请中";
        case "1":
        case 1:
            return "打款中";
        case "2":
        case 2:
            return "提现拒绝";
        case "3":
        case 3:
            return "已完成(已打款)";

        default:
            break;
    }
}