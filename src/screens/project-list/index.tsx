import React, {useState, useEffect} from 'react';
import { SearchPanel } from "./search-panel"
import { ListScreen } from "./list"
import { cleanObject, useMount, useDebounce,useArray } from 'utils';
import * as qs from 'qs';
import {useHttp} from "../../utils/http"
import { Button, List } from 'antd'

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
    const {value, add } = useArray([{name: 'jack', age: 19}])

    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debounceParam = useDebounce(param, 200);
    const [list, setList] =useState([])
    const [users, setUsers] = useState([])
    const client = useHttp()

    useEffect(() => {
        client('projects', {data: cleanObject(debounceParam)}).then(setList)
    },[debounceParam])

    // componentDidMount
    useMount(() => {
        client('users').then(setUsers)
    })

    return <div>
        <SearchPanel param={param} users={users} setParam={setParam} />
        <ListScreen users={users} list={list} />
        <Button onClick={() => add({name: 'john', age: 19})}>添加john</Button>
        <List dataSource={value}
            renderItem={(item,index) =>
                <List.Item key={index}>{item.name} --- {item.age}</List.Item>
            } />
    </div>
}