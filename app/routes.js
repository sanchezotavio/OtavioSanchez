import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import Main from './common/main.component';
import Home from './common/home.component';
import Projetos from './common/projetos.component';
import Sobre from './common/sobre.component';

export default(

    <Route component={Main}>
        <IndexRoute component={Home}/>
        <Route path="/projetos" component={Projetos}/>
        <Route path="/sobre" component={Sobre}/>
        <Route path="/home" component={Home}/>
        <Route path="*" component={Home}/>
    </Route>

)