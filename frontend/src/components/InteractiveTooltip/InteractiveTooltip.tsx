import React from 'react';
import './InteractiveTooltip.css';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { TooltipProps } from 'recharts';
import bem from '../../utils/bem';
import { MdClear } from 'react-icons/all';

const { bemBlock, bemElement } = bem('interactive-tooltip');

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
            <div className={bemElement('close-button-wrapper')}>
                <MdClear className={bemElement('close-button')} onClick={props.onCloseClicked} />
            </div>
            <div className={bemElement('content')}>
                <span>I am a custom tooltip</span>
            </div>
        </div>
    ) : null;
}
