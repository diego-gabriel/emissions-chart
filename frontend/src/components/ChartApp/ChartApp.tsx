import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../store/Store';
import CurrentUserForm from '../CurrentUserForm';
import CO2EmissionsChart from '../CO2EmissionsChart';
import { dataSelectors } from '../../selectors/dataSelectors';
import {dataActions} from "../../actions/DataActions";
export default function ChartApp() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: State) => state.currentUser);
    const greeting = currentUser ? `This is ${currentUser}.` : 'No user given.';
    const data = useSelector(dataSelectors.getData);

    useEffect(() => {
        dispatch(dataActions.getData());
    }, [dispatch]);

    return (
        <>
            <h1>Hello Calliper! {greeting}</h1>
            <CurrentUserForm />
            {data && data !== 'loading' ? <CO2EmissionsChart data={data} /> : data}
        </>
    );
}
