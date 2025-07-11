import { FC } from "react"
import { cn } from "../utils/cn"

export type InputProps = {
    name?: string
    value?: any
    type?: string
    placeHolder?: string
    classNames?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const Input: FC<InputProps> = ({value, onChange, name, type, placeHolder, classNames}) => <input value={value} onChange={onChange} name={name} type={type} placeholder={placeHolder} className={cn("w-full p-2 focus:outline-none", classNames)}/>
