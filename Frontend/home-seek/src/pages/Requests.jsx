import React from 'react'
import { Tabs } from 'antd';
import OwnerRequests from './OwnerRequests'
import UserRequests from './UserRequests.jsx'

const { TabPane } = Tabs;

class Requests extends React.Component {
  render() {
    return (
      <div>
        <Tabs tabPosition={'top'}>
          {/* <TabPane tab="User" key="1">
            <UserRequests/>
          </TabPane> */}
          <TabPane tab="Owner" key="2">
            <OwnerRequests/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Requests
