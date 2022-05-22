import React, {useState, useEffect} from 'react';
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { cleanObject, useMount, useDebounce,useArray } from 'utils';
import * as qs from 'qs';
import {useHttp} from "../../utils/http"

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
        <List users={users} list={list} />
        <button onClick={() => add({name: 'john', age: 19})}>添加john</button>
        <ul>
            {
                value.map((item,index) => <li key={index}>{item.name}---{item.age}</li>)
            }
        </ul>
    </div>
}