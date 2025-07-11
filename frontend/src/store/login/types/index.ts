export type LoginFormData = {
    email: string
    password: string
}
export type LoginStore = {
    data: LoginFormData,
    success: boolean
    loading: boolean
    update: (key: string, value: string) => void
    submit: () => void
    reset: () => void
}