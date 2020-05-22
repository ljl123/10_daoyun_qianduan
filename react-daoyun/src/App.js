import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import {
  adminRoutes, dicRoutes, personRoutes, teRoutes
} from './routes';
import Frame from './components/Frame/Index';
import './App.css'
import { isLogined, isManager } from './utils/auth';

function App() {
  if (isLogined() && isManager()) {
    return (
      <Frame>
        <Switch > {
          adminRoutes.map(route => {
            return (
              <Route key={route.path} path={route.path} exact={route.exact} render={routeProps => {
                return <route.component {...routeProps} />;
              }}
              />
            );
          })}
          {
            personRoutes.map(route => {
              return (
                <Route key={route.path} path={route.path} exact={route.exact} render={routeProps => {
                  return <route.component {...routeProps} />;
                }}
                />
              );
            })}
          {
            teRoutes.map(route => {
              return (
                <Route key={route.path} path={route.path} exact={route.exact} render={routeProps => {
                  return <route.component {...routeProps} />;
                }}
                />
              );
            })}
          {
            dicRoutes.map(route => {
              return (
                <Route key={route.path} path={route.path} exact={route.exact} render={routeProps => {
                  return <route.component {...routeProps} />;
                }}
                />
              );
            })}
          <Redirect to={adminRoutes[0].path} from="/admin" />
          < Redirect to="/404" />
        </Switch>
      </Frame>
    );
  }
  if (isLogined() && !isManager()) {
    return (
      <Frame>
        <Switch >
          {
            teRoutes.map(route => {
              return (
                <Route key={route.path} path={route.path} exact={route.exact} render={routeProps => {
                  return <route.component {...routeProps} />;
                }}
                />
              );
            })}
          < Redirect to="/403" />
        </Switch>
      </Frame>
    );
  } else {
    return (<Redirect to="/login" />);
  }
  // return isLogined() ? (
  //   <Frame>
  //     <Switch > {
  //       adminRoutes.map(route => {
  //         return (
  //           <Route key={route.path} path={route.path} exact={route.exact} render={routeProps => {
  //             return <route.component {...routeProps} />;
  //           }}
  //           />
  //         );
  //       })}
  //       {
  //         personRoutes.map(route => {
  //           return (
  //             <Route key={route.path} path={route.path} exact={route.exact} render={routeProps => {
  //               return <route.component {...routeProps} />;
  //             }}
  //             />
  //           );
  //         })}
  //       {
  //         dicRoutes.map(route => {
  //           return (
  //             <Route key={route.path} path={route.path} exact={route.exact} render={routeProps => {
  //               return <route.component {...routeProps} />;
  //             }}
  //             />
  //           );
  //         })}
  //       <Redirect to={adminRoutes[0].path} from="/admin" />
  //       < Redirect to="/404" />
  //     </Switch>
  //   </Frame>
  // ) : (
  //     <Redirect to="/login" />
  //   );
}

export default App;