import { Table } from 'antd';
import React from 'react';
import {User} from "screens/project-list/search-panel"

interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
}

interface ListProps {
    list: Project[],
    users: User[]
}

export const ListScreen = ({list, users}: ListProps) => {
    return <Table pagination={false} 
        rowKey={"id"}
        columns={[
            {
                title: '名称',
                dataIndex: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name)
            },{
                title: '负责人',
                render(value, project){
                    return <span>
                        {users.find(user => user.id === project.personId)?.name || "未知"}
                    </span>
                }
            }
        ]} dataSource={list} />
}