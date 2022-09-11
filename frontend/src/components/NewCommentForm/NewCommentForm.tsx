import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import bem from '../../utils/bem';
import './NewCommentForm.css';
import { commentActions } from '../../actions/CommentActions';

const { bemBlock, bemElement } = bem('current-user-form');

export default function NewCommentForm(props: { dataId: number }) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [text, setText] = useState('');

    const onUserInputChange = (event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
    const onTextInputChange = (event: ChangeEvent<HTMLInputElement>) => setText(event.target.value);

    const dispatchPostComment = () => {
        const trimmedUsername = username.trim();
        const trimmedText = text.trim();

        if (trimmedText !== '' && trimmedText !== '') {
            dispatch(
                commentActions.postComments({
                    username: trimmedUsername,
                    text: trimmedText,
                    data_id: props.dataId,
                    parent_id: null,
                })
            );
            setText('');
        }
    };

    return (
        <div className={bemBlock()}>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" value={username} onChange={onUserInputChange} />

            <label htmlFor="comment-text">Comment:</label>
            <input type="text" name="comment-text" value={text} onChange={onTextInputChange} />

            <button type="button" onClick={dispatchPostComment}>
                Save comment
            </button>
        </div>
    );
}
