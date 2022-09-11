import React from 'react';
import './InteractiveTooltip.css';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { TooltipProps } from 'recharts';
import bem from '../../utils/bem';
import { MdClear } from 'react-icons/md';
import NewCommentForm from '../NewCommentForm';
import CommentView from '../CommentView';
import { useSelector } from 'react-redux';
import { State } from '../../store/Store';
import { commentSelectors } from '../../selectors/commentSelectors';

const { bemBlock, bemElement } = bem('interactive-tooltip');

interface Props {
    dataIndex: number;
    forceVisible: boolean;
    onCloseClicked: () => void;
}

type InteractiveTooltipProps<TValue extends ValueType, TName extends NameType> = TooltipProps<TValue, TName> & Props;

export default function InteractiveTooltip<TValue extends ValueType, TName extends NameType>(
    props: InteractiveTooltipProps<TValue, TName>
) {
    const comments = useSelector((state: State) => commentSelectors.getCommentsByDataId(state, props.dataIndex));
    const commentList = comments.map((comment) => <CommentView key={comment.id} comment={comment} />);

    return props.forceVisible ? (
        <div className={bemBlock()}>
            <div className={bemElement('close-button-wrapper')}>
                <MdClear className={bemElement('close-button')} onClick={props.onCloseClicked} />
            </div>
            <div className={bemElement('content')}>
                <div className={bemElement('comment-count')}>
                    {comments.length} {comments.length == 1 ? 'Comment' : 'Comments'}
                </div>
                {commentList}
                <NewCommentForm dataId={props.dataIndex} />
            </div>
        </div>
    ) : null;
}
