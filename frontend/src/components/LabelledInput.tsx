import { FC } from "react"

export type LabelledInputProps = {
    label?: string
    name?: string
    value?: any
    type?: string
    placeHolder?: string
    classNames?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const LabelledInput: FC<LabelledInputProps> = ({label, name, value, type, placeHolder, classNames, onChange}) => {
    return <div className="w-full border border-gray-200 rounded-md p-2">
        <div className="w-full text-gray-600 text-sm">{label}</div>
        <input name={name} value={value} onChange={onChange} type={type} className={classNames} placeholder={placeHolder}/>
    </div>
}