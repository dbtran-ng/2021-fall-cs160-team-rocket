import React, { Fragment } from 'react';
import spinner from '../../img/spinner.gif';
const Spinner = () => (
    <Fragment>
        <img src={spinner} style={{width:'400px', margin:'auto', display:'block'}} alt='loading'/>
    </Fragment>
);

export default Spinner;
