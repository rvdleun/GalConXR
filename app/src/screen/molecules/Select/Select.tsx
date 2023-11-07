import { FC } from "react";
import { Button } from "../../atoms/Button/Button";
import { Label } from "../../atoms/Label/Label";

export interface SelectOption<T> {
    text: string;
    value: T;
}

interface SelectProps {
    onNewSelectedOption: (option: SelectOption<any>) => void,
    options: SelectOption<any>[];
    selectedOption: SelectOption<any>;
    width: number;
    x: number;
    y: number;
}

export const Select: FC<SelectProps> = ({ onNewSelectedOption, options, selectedOption, x, y, width }) => {
    const changeOption = (change: number) => {
        let index = options.findIndex(option => option === selectedOption) + change;
        if (index < 0) {
            index = options.length - 1;
        } else if (index >= options.length) {
            index = 0
        }

        onNewSelectedOption(options[index]);
    }

    return <>
        <Button x={x} y={y} width={75} text="<<" onClick={() => changeOption(-1)} />
        <Button x={x + width - 75} y={y} width={75} text=">>" onClick={() => changeOption(1)} />
        <Label x={width / 2} y={y + 40} text={selectedOption.text} />
    </>
}