import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../store/Store';
import CurrentUserForm from '../CurrentUserForm';
import CO2EmissionsChart from '../CO2EmissionsChart';

export default function ChartApp() {
    const currentUser = useSelector((state: State) => state.currentUser);
    const greeting = currentUser ? `This is ${currentUser}.` : 'No user given.';

    return (
        <>
            <h1>Hello Calliper! {greeting}</h1>
            <CurrentUserForm />
            <CO2EmissionsChart />
        </>
    );
}
