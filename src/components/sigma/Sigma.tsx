import * as React from "react";
import * as styles from "./sigma.scss";

export interface SigmaProps {
    start: string;
    end: string;
}

export const Sigma: React.FunctionComponent<SigmaProps> = props => {
    return (
        <span>
            <span
                className={styles.default.sigma}
                data-start={props.start}
                data-end={props.end}
            >
                &Sigma;
            </span>
            {props.children}
        </span>
    );
};
