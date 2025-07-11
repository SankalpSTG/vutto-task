import { FC } from "react"

export type InputProps = {
    name?: string
    value?: any
    type?: string
    placeHolder?: string
    classNames?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const Input: FC<InputProps> = ({value, onChange, name, type, placeHolder, classNames}) => <input value={value} onChange={onChange} name={name} type={type} className={classNames} placeholder={placeHolder}/>
