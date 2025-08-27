import {notification, Table} from "antd";
import React, {use, useEffect, useState} from "react";
import { getUserApi } from "../utils/api";

const UserPage = () =>{
    const [dataSource,setDataSource] = useState([]);
    useEffect(()=>{
        getUserApi().then((response)=>{
            setDataSource(response.data);
        }).catch((error)=>{
            notification.error({
                message: "Error",
                description: error.response ? error.response.data.message : error.message,
            });
        });
    },[]);
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        }
    ];
    return (
        <div style={{padding:20}}>
            <Table dataSource={dataSource} columns={columns} rowKey="id"/>
        </div>
    )
}
export default UserPage;