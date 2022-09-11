import { DotProps } from 'recharts';
import bem from '../../utils/bem';
import React, { MouseEventHandler } from 'react';
import './ClickableDot.css';

const { bemBlock } = bem('clickable-dot');

interface Props {
    activeIndex: number;
    index?: number;
}

export type ClickableDotProps = DotProps & Props;

export default function ClickableDot(props: ClickableDotProps) {
    const onClick: MouseEventHandler<SVGCircleElement> = (event) => {
        props.onClick(props, event);
    };

    return (
        <circle
            className={bemBlock({ focused: props.index === props.activeIndex })}
            cx={props.cx}
            cy={props.cy}
            onClick={onClick}
        />
    );
}
