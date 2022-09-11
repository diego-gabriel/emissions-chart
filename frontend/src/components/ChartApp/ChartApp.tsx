import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CO2EmissionsChart from '../CO2EmissionsChart';
import { dataSelectors } from '../../selectors/dataSelectors';
import { dataActions } from '../../actions/DataActions';
import { commentActions } from '../../actions/CommentActions';
export default function ChartApp() {
    const dispatch = useDispatch();
    const data = useSelector(dataSelectors.getData);

    useEffect(() => {
        dispatch(dataActions.getData());
        dispatch(commentActions.getComments());
    }, [dispatch]);

    return (
        <>
            <h1>Hello Calliper!</h1>
            {data && data !== 'loading' ? <CO2EmissionsChart data={data} /> : data}
        </>
    );
}
