import { DotProps } from 'recharts';
import bem from '../../utils/bem';
import React, { MouseEventHandler } from 'react';
import './ClickableDot.css';
import { useSelector } from 'react-redux';
import { commentSelectors } from '../../selectors/commentSelectors';
import { State } from '../../store/Store';
import { Position } from '../../utils/types';

const { bemBlock, bemElement } = bem('clickable-dot');

interface Props {
    showCount: boolean;
    activeIndex: number;
    index?: number;
}

export type ClickableDotProps = DotProps & Props;

function CommentCount(props: Position & { data_id: number }) {
    const count = useSelector((state: State) => commentSelectors.getCommentsByDataId(state, props.data_id)).length;

    return (
        <text className={bemElement('comment-count')} x={props.x} y={props.y}>
            {count}
        </text>
    );
}

export default function ClickableDot(props: ClickableDotProps) {
    const comments = useSelector((state: State) => commentSelectors.getCommentsByDataId(state, props.index));
    const onClick: MouseEventHandler<SVGCircleElement> = (event) => {
        props.onClick(props, event);
    };

    return (
        <>
            {props.showCount && <CommentCount x={props.cx} y={props.cy - 10} data_id={props.index} />}
            <circle
                className={bemBlock({ focused: props.index === props.activeIndex })}
                cx={props.cx}
                cy={props.cy}
                onClick={onClick}
            />
        </>
    );
}
