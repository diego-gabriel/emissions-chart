import React from 'react';
import { Comment } from '../../utils/types';
import bem from '../../utils/bem';
import './CommentView.css';

const { bemBlock, bemElement } = bem('comment-view');

interface Props {
    comment: Comment;
}

export default function CommentView({ comment }: Props) {
    return (
        <div className={bemBlock()}>
            <div className={bemElement('username')}>{comment.username}</div>
            <div className={bemElement('text')}>{comment.text}</div>
        </div>
    );
}
