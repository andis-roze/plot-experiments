import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Sigma } from "../sigma/Sigma";
import { Fraction } from "../fraction/Fraction";
import { Form, FieldTypes } from "../form/Form";
import { Input } from "../form/Input";
import { FunctionPlot } from "../function-plot/FunctionPlot";

interface Parameters {
    n: number;
    s: number;
}

function buildSeries(params: Parameters) {
    const members = [];

    for (let i = 1; i <= params.n; i++) {
        members.push(`1/${params.n}^${params.s}`);
    }
    console.log(members.join("+"));
    return members.join("+");
}

interface ParameterFormProps {
    parameters: Parameters;
    onUpdate: (parameters: Parameters) => void;
}

function ParameterFields(props: ParameterFormProps) {
    const { watch } = useFormContext<Parameters>();
    const n = watch("n");
    const s = watch("s");

    React.useEffect(
        () => props.onUpdate({ n, s }),
        [n, s]
    );

    return (
        <>
            <label>
                <strong>n:&nbsp;</strong>
                <Input type={FieldTypes.NUMBER} name="n" step={2} min={1} />
            </label>
            <label>
                <strong>&nbsp;&nbsp;&nbsp;s:&nbsp;</strong>
                <Input type={FieldTypes.NUMBER} name="s" step={1} min={1} />
            </label>
        </>
    );
}

export const RiemannZetaFunction = () => {
    const [parameters, setParameters] = React.useState<Parameters>({ n: 2, s: 1 });
    const { n, s } = parameters;
    const [fn, setFn] = React.useState<string>(buildSeries({ n, s }));

    React.useEffect(
        () => setFn(buildSeries({ n, s })),
        [n, s]
    );

    return (
        <>
        <div className="top-row">
            <a
                href="https://en.wikipedia.org/wiki/Riemann_zeta_function"
                target="_blank"
                style={{ textDecoration: "none" }}
            >
                <Sigma
                    start="n = 1"
                    end="&infin;"
                >
                    <Fraction numerator="1" denominator="n<sup>s</sup>" />
                </Sigma>
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Form defaultValues={{ n, s }}>
                <ParameterFields parameters={{ n, s }} onUpdate={setParameters} />
            </Form>
        </div>
            <FunctionPlot
                className="content"
                // xAxisDomain={[-1, 1]}
                // yAxisDomain={[-1.25, 1.25]}
                title="Riemann Zeta Function"
                fn={fn}
            />
        </>
    );
};
