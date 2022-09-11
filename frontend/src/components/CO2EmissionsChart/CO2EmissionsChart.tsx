import React, { useState } from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import './CO2EmissionsChart.css';
import bem from '../../utils/bem';
import ClickableDot, { ClickableDotProps } from '../ClickableDot';
import InteractiveTooltip from '../InteractiveTooltip';
import { EmissionsData, Position } from '../../utils/types';

const { bemBlock } = bem('co2-emissions-chart');

type PossiblePosition = Position | undefined;

export default function CO2EmissionsChart(props: { data: EmissionsData }) {
    const [tooltipPosition, setTooltipPosition] = useState<PossiblePosition>(undefined);
    const [activeDotIndex, setActiveDotIndex] = useState(-1);

    const onDotClick = (dotProps: ClickableDotProps) => {
        setTooltipPosition({ x: dotProps.cx, y: dotProps.cy });
        setActiveDotIndex(dotProps.index);
    };

    const closeTooltip = () => {
        setTooltipPosition(undefined);
        setActiveDotIndex(-1);
    };

    return (
        <div className={bemBlock()}>
            <h1>CO2 and greenhouse gas emissions per-capita in the EU</h1>
            <LineChart width={600} height={300} data={props.data} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="year" />
                <YAxis unit="tons" />
                <Tooltip
                    position={tooltipPosition}
                    wrapperStyle={{
                        outline: 'none',
                    }}
                    content={<InteractiveTooltip forceVisible={!!tooltipPosition} onCloseClicked={closeTooltip} />}
                />
                <Line
                    type="monotone"
                    dataKey="emissions"
                    stroke="#8884d8"
                    dot={<ClickableDot onClick={onDotClick} activeIndex={activeDotIndex} />}
                    activeDot={false}
                />
            </LineChart>
        </div>
    );
}
