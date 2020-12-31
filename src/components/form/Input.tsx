import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FieldTypes } from "../form/Form";

export interface InputProps {
    id?: string;
    type: FieldTypes;
    name: string;
    step?: number;
    min?: number;
    max?: number;
}

export function Input(props: InputProps) {
    const { register } = useFormContext();

    return (
        <input
            ref={register}
            type={props.type}
            name={props.name}
            step={props.step}
            min={props.min}
            max={props.max}
        />
    );
}
