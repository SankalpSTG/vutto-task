import { FC } from "react"

export type ImageItemProps = {
    children: any
    onClick?: () => void
}
export const ImageItem: FC<ImageItemProps> = ({children, onClick}) => {
    return <div onClick={onClick} className="flex-shrink-0 w-[110px] aspect-square border border-gray-200 rounded-md flex items-center justify-center cursor-pointer overflow-hidden">
        {children}
    </div>
}