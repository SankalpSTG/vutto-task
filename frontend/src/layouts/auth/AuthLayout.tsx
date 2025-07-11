import { FC, JSX } from "react"
export type AuthLayoutProps = {
    children: JSX.Element
}
const AuthLayout: FC<AuthLayoutProps> = ({children}) => {
    return <div className="w-full h-[100vh] flex items-center justify-center p-4">
        <div className="w-[480px] max-w-full rounded-md shadow-md">
            {children}
        </div>
    </div>
}

export default AuthLayout