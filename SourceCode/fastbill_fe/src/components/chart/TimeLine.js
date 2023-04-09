import React from "react";
import { Timeline, TimelineEvent } from "react-event-timeline";
import { NodeIndexOutlined } from "@ant-design/icons";

export default function TimeLine() {
    return (
        <div className="w-[35%] bg-slate-100 p-5 m-5 shadow-lg shadow-indigo-500/40">
            <Timeline>
                <TimelineEvent
                    className="text-sm"
                    createdAt="2023-03-06 10:06 PM"
                    icon={<NodeIndexOutlined />}
                    title=''
                >
                    Tiền điện tháng 2 đã được thanh toán thành công.
                </TimelineEvent>
                <TimelineEvent
                    className="text-sm"
                    createdAt="2023-03-01 09:06 AM"
                    icon={<NodeIndexOutlined />}
                    title=''
                >
                    Tiện ích tháng 3, nhanh tay nhận mã giảm giá lên tới 50K khi thanh
                    toán hóa đợn tiền điện qua Ví điện tử VN-Pay!
                </TimelineEvent>

                <TimelineEvent
                    className="text-sm"
                    createdAt="2023-03-04 09:06 AM"
                    icon={<NodeIndexOutlined />}
                    title=''
                >
                    Tiện ích tháng 3, nhanh tay nhận mã giảm giá lên tới 50K khi thanh
                    toán hóa đợn tiền điện qua Ví điện tử VN-Pay!
                </TimelineEvent>
            </Timeline>
        </div>
    );
}
