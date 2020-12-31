import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Sigma } from "../sigma/Sigma";
import { Form, FieldTypes } from "../form/Form";
import { Input } from "../form/Input";
import { FunctionPlot } from "../function-plot/FunctionPlot";

function buildSeries(n: number, a: number, b: number): string {
    const members = [];

    for (let i = 0; i <= n; i++) {
        members.push(`${a ** i}*cos(${(b ** i) * Math.PI}*x)`);
    }

    return members.join("+");
}

interface Parameters {
    n: number;
    a: number;
    b: number;
}

interface ParameterFormProps {
    parameters: Parameters;
    onUpdate: (parameters: Parameters) => void;
}

function ParameterFields(props: ParameterFormProps) {
    const { watch } = useFormContext<Parameters>();
    const n = watch("n");
    const a = watch("a");
    const b = watch("b");

    React.useEffect(
        () => props.onUpdate({ n, a, b }),
        [n, a, b]
    );

    return (
        <>
            <label>
                <strong>n:&nbsp;</strong>
                <Input type={FieldTypes.NUMBER} name="n" step={1} min={0} />
            </label>
            <label>
                <strong>&nbsp;&nbsp;&nbsp;a:&nbsp;</strong>
                <Input type={FieldTypes.NUMBER} name="a" step={0.01} />
            </label>
            <label>
                <strong>&nbsp;&nbsp;&nbsp;b:&nbsp;</strong>
                <Input type={FieldTypes.NUMBER} name="b" step={0.1} />
            </label>
        </>
    );
}

export const WeierstrassFunction = () => {
    const [parameters, setParameters] = React.useState<Parameters>({ n: 10, a: 0.2, b: 7 });
    const { n, a, b } = parameters;
    const [fn, setFn] = React.useState<string>(buildSeries(n, a, b));

    React.useEffect(
        () => setFn(buildSeries(n, a, b)),
        [n, a, b]
    );

    return (
        <>
            <div className="top-row">
                <div>
                    <Sigma
                        start="n = 0"
                        end="&infin;"
                    >
                        a<sup>n</sup> cos(b<sup>n</sup> &pi; x)
                    </Sigma>
                    <Form defaultValues={{ n, a, b }}>
                        <ParameterFields parameters={{ n, a, b }} onUpdate={setParameters} />
                    </Form>
                </div>
            </div>
            <FunctionPlot
                className="content"
                xAxisDomain={[-1, 1]}
                yAxisDomain={[-1.25, 1.25]}
                title="Weierstrass function"
                fn={fn}
            />
        </>
    );
};
