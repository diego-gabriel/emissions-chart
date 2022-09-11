import React, { useCallback, useState } from 'react';
import { CartesianGrid, Dot, DotProps, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import './CO2EmissionsChart.css';
import bem from '../../utils/bem';

const { bemElement } = bem('co2-emissions-chart');

const data = [
    {
        year: 1980,
        emissions: 123,
    },
    {
        year: 1990,
        emissions: 234,
    },
    {
        year: 2000,
        emissions: 463,
    },
    {
        year: 2010,
        emissions: 793,
    },
    {
        year: 2020,
        emissions: 1092,
    },
];

function CustomTooltip(props: any) {
    return props.forceVisible ? <div className="custom-tooltip">I am a custom tooltip</div> : null;
}

interface Position {
    x: number;
    y: number;
}

interface ActiveDotProps {
    visible: boolean;
}

function Dot(props: ActiveDotProps & DotProps) {
    const { bemBlock, bemElement } = bem('dot');

    const [hasFocus, setHasFocus] = useState(false);

    const onClick = (event) => {
        console.log(event);
        setHasFocus(true);
        props.onClick(props, event);
    };

    return <circle className={bemBlock({ focused: hasFocus })} cx={props.cx} cy={props.cy} onClick={onClick} />;
}

type PossiblePosition = Position | undefined;

export default function CO2EmissionsChart() {
    const [tooltipPosition, setTooltipPosition] = useState<PossiblePosition>(undefined);

    const onDotClick: DotProps['onClick'] = (dotProps, event) => {
        setTooltipPosition({ x: dotProps.cx, y: dotProps.cy });
    };

    return (
        <LineChart width={600} height={300} data={data} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip position={tooltipPosition} content={<CustomTooltip forceVisible={!!tooltipPosition} />} />
            <Line
                type="monotone"
                dataKey="emissions"
                stroke="#8884d8"
                dot={<Dot visible={true} onClick={onDotClick} />}
                activeDot={false}
            />
        </LineChart>
    );
}
