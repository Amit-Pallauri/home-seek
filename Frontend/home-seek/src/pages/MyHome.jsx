import React, { Component } from 'react'
import UserServices from './UserServices';
import { Tabs } from 'antd'
const { TabPane } = Tabs;

export default class MyHome extends Component {
    render() {
        return (
            <div>
                <Tabs tabPosition={'top'}>
                    <TabPane tab="services" key="1">
                        <UserServices/>
                    </TabPane> 
                    <TabPane tab="My home" key="2">
                       my home
                    </TabPane>     
                </Tabs>
            </div>
        )
    }
}
