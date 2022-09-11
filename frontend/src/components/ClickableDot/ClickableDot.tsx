import { DotProps } from 'recharts';
import bem from '../../utils/bem';
import React, { MouseEventHandler } from 'react';
import './ClickableDot.css';
import {useSelector} from "react-redux";
import {commentSelectors} from "../../selectors/commentSelectors";
import {State} from "../../store/Store";

const { bemBlock, bemElement } = bem('clickable-dot');

interface Props {
    activeIndex: number;
    index?: number;
}

export type ClickableDotProps = DotProps & Props;

export default function ClickableDot(props: ClickableDotProps) {
    const comments = useSelector((state: State) => commentSelectors.getCommentsByDataId(state, props.index))
    const onClick: MouseEventHandler<SVGCircleElement> = (event) => {
        props.onClick(props, event);
    };

    return (
        <>
            <text className={bemElement("text")} x={props.cx} y={props.cy-10}>{comments.length}</text>
            <circle
                className={bemBlock({ focused: props.index === props.activeIndex })}
                cx={props.cx}
                cy={props.cy}
                onClick={onClick}
            />
        </>
    );
}
