import React, {useState, useEffect} from 'react';
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { cleanObject, useMount, useDebounce,useArray } from 'utils';
import * as qs from 'qs';

const apiUrl = process.env.REACT_APP_API_URL;

console.log(apiUrl)

export const ProjectListScreen = () => {
    const {value, add } = useArray([{name: 'jack', age: 19}])

    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debounceParam = useDebounce(param, 200);
    const [list, setList] =useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
            if(response.ok){
                setList(await response.json())
            }
        })
    },[debounceParam])

    // componentDidMount
    useMount(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if(response.ok){
                setUsers(await response.json())
            }
        })
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