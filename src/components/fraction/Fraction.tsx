import * as React from "react";
import * as styles from "./fraction.scss";

export interface FractionProps {
    numerator: string;
    denominator: string;
}

export const Fraction: React.FunctionComponent<FractionProps> = props => {
    return (
        <div className={styles.default.frac}>
            <span dangerouslySetInnerHTML={{ __html: props.numerator }} />
            <span className={styles.default.symbol}>/</span>
            <span className={styles.default.bottom} dangerouslySetInnerHTML={{ __html: props.denominator }} />
        </div>
    );
};
