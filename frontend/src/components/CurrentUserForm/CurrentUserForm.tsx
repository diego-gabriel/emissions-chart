import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { currentUserActions } from '../../reducers/CurrentUser';
import bem from '../../utils/bem';
import './CurrentUserForm.css';

const { bemBlock, bemElement } = bem('current-user-form');

export default function CurrentUserForm() {
    const dispatch = useDispatch();
    const [user, setUser] = useState('');

    const onUserInputChange = (event: ChangeEvent<HTMLInputElement>) => setUser(event.target.value);
    const dispatchCurrentUser = () =>
        dispatch(user.trim() === '' ? currentUserActions.unsetCurrentUser() : currentUserActions.setCurrentUser(user));

    return (
        <div className={bemBlock()}>
            <input type="text" value={user} onChange={onUserInputChange} />
            <button type="button" onClick={dispatchCurrentUser}>
                Set current user
            </button>
        </div>
    );
}
