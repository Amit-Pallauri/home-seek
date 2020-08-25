import React from 'react'
import { Tabs } from 'antd';
import OwnerRequests from './OwnerRequests'

const { TabPane } = Tabs;

class Requests extends React.Component {
  render() {
    return (
      <div>
        <Tabs tabPosition={'top'}>
          <TabPane tab="Listing requests" key="1">
            <OwnerRequests/>
          </TabPane>        
        </Tabs>
      </div>
    );
  }
}

export default Requests
