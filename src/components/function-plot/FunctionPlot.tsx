import * as React from "react";
import funtionPlot from "function-plot";

export interface FunctionPlotProps {
    className: string;
    title?: string;
    fn: string;
    xAxisDomain?: [number, number];
    yAxisDomain?: [number, number];
}

export const FunctionPlot: React.FunctionComponent<FunctionPlotProps> = (props) => {
    const plotEl = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (plotEl.current) {
            const bodyRect = document.body.getBoundingClientRect();
            const { width, height } = plotEl.current.getBoundingClientRect();
            const dim = Math.min(width, height);
            const ratio = bodyRect.width / dim;

            funtionPlot({
                // @ts-ignore
                target: plotEl.current,
                title: props.title,
                grid: true,
                width: dim * ratio,
                height: dim * ratio,
                xAxis: { domain: props.xAxisDomain },
                yAxis: { domain: props.yAxisDomain },
                data: [
                    { fn: props.fn },
                ],
            });
        }
    });

    return (
        <div ref={plotEl} className={props.className} />
    );
};
