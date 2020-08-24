import React from 'react'
import { Tabs } from 'antd';
import OwnerProfile from './OwnerRequests'
import UserProfile from './UserRequests.jsx'

const { TabPane } = Tabs;


class Profile extends React.Component {
  state = {
    tabPosition: 'top',
  };

  render() {
    return (
      <div>
        <Tabs tabPosition={this.state.tabPosition}>
          <TabPane tab="User" key="1">
            <UserProfile/>
          </TabPane>
          <TabPane tab="Owner" key="2">
            <OwnerProfile/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}


export default Profile
