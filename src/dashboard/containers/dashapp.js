import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {CONFIG} from 'dashboard/config';
import {loginAction, logoutAction} from 'dashboard/reducers/actions';
import {getLogin} from 'dashboard/reducers/selectors';
import {Section, SidebarLayout} from 'views';

import 'styles/dashboard.scss';


class DashApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {username: ''};
  }

  componentWillMount(){
    // this.props.fetchConfig();
  }

  render(){
    const sidebarList = [
      ['Home', '/'],
      ['Pages', '/pages'],
    ];

    return <div>
      <nav className="docked">
        <div className="nav-spacer"></div>
        <div className="nav-container">
          <div className="container">
            <div className="brand brand-padded"><Link to={'/'}><img src={'https://git-scm.com/images/logos/downloads/Git-Icon-Black.png'}/></Link></div>
            <ul className="nav-list">

            </ul>
            <ul className="nav-list right">

              {!this.props.logininfo && <li>
                <input placeholder="username" onBlur={(event)=>{
                  this.setState({username: event.target.value});
                }}/></li>}
              {!this.props.logininfo &&
                <li><button className="button-primary" onClick={()=>{
                    if(this.state.username.length > 1){
                      this.props.login(this.state.username);
                    }
                  }}>Login</button></li>}
              {this.props.logininfo && <li>
                <h6>Signed in as: {this.props.logininfo.username}</h6>
              </li>}
              {this.props.logininfo && <li>
                <button className="button-outline-primary" onClick={()=>{
                    this.props.logout();
                  }}>Logout</button>
              </li>}
            </ul>
          </div>
        </div>
      </nav>


      <SidebarLayout title="Dashboard" list={sidebarList}>
        <Section>
          {this.props.children}
        </Section>
      </SidebarLayout>
    </div>;
  }
}

const mapStateToProps = (state)=>{
  return {
    logininfo: getLogin(state)
  };
};

const mapDispatchToProps = (dispatch, props)=>{
  return {
    login: (username)=>{
      dispatch(loginAction(CONFIG.retrieve('loginClientId'), username));
    },
    logout: ()=>{
      dispatch(logoutAction());
    }
  };
};

DashApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashApp);

export {DashApp};
