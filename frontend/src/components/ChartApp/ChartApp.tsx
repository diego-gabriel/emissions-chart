import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CO2EmissionsChart from '../CO2EmissionsChart';
import { dataSelectors } from '../../selectors/dataSelectors';
import { dataActions } from '../../actions/DataActions';
import { commentActions } from '../../actions/CommentActions';
import "./ChartApp.css";
import bem from "../../utils/bem";

const { bemBlock, bemElement } = bem('chart-app');

export default function ChartApp() {
    const dispatch = useDispatch();
    const data = useSelector(dataSelectors.getData);

    useEffect(() => {
        dispatch(dataActions.getData());
        dispatch(commentActions.getComments());
    }, [dispatch]);

    return (
        <div className={bemBlock()}>
            <div className={bemElement('header')}>
                <h1>Hello Calliper!</h1>
                <div>This isn't just a simple chart.</div>
            </div>
            {data && data !== 'loading' ? <CO2EmissionsChart data={data} /> : data}
        </div>
    );
}
