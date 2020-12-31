import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";

export enum FieldTypes {
    RANGE = "range",
    HIDDEN = "hidden",
    TEXT = "text",
    TEL = "tel",
    CHECKBOX = "checkbox",
    NUMBER = "number",
    EMAIL = "email",
}

export interface FormProps {
    defaultValues: any;
}

export const Form: React.FunctionComponent<FormProps> = props => {
    const form = useForm({
        defaultValues: props.defaultValues,
    });

    return (
        <FormProvider {...form}>
            <form>
                {props.children}
            </form>
        </FormProvider>
    );
};
