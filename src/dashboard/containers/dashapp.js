import React from 'react';
import {connect} from 'react-redux';

import {CONFIG} from 'dashboard/config';
import {Section, SidebarLayout} from 'views';

import 'bullet-flash';
import 'styles/dashboard.scss';


class DashApp extends React.Component {
  componentWillMount(){
    // this.props.fetchConfig();
  }

  render(){
    const sidebarList = [
      ['Home', '/'],
      ['Pages', '/pages'],
    ];

    return <div>
      <SidebarLayout title="Dashboard" list={sidebarList}>
        <Section>
          {this.props.children}
        </Section>
      </SidebarLayout>
    </div>;
  }
}

// const makeMapStateToProps = ()=>{
//   const getNav = makeGetNav();
//   return (state)=>{
//     return getNav(state);
//   };
// };
//
// const mapDispatchToProps = (dispatch, props)=>{
//   return {
//     fetchConfig: ()=>{
//       dispatch(fetchConfigAction(CONFIG.retrieve('baseConfigUrl')));
//     }
//   };
// };
//
// App = connect(
//   makeMapStateToProps,
//   mapDispatchToProps
// )(App);

export {DashApp};
