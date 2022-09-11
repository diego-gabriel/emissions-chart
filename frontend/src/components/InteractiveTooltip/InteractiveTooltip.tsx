import React from 'react';
import './InteractiveTooltip.css';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { TooltipProps } from 'recharts';
import bem from '../../utils/bem';

const { bemBlock } = bem('interactive-tooltip');

interface Props {
    forceVisible: boolean;
    onCloseClicked: () => void;
}

type InteractiveTooltipProps<TValue extends ValueType, TName extends NameType> = TooltipProps<TValue, TName> & Props;

export default function InteractiveTooltip<TValue extends ValueType, TName extends NameType>(
    props: InteractiveTooltipProps<TValue, TName>
) {
    return props.forceVisible ? (
        <div className={bemBlock()}>
            <span>I am a custom tooltip</span>
            <button type="button" onClick={props.onCloseClicked}>
                Close
            </button>
        </div>
    ) : null;
}
