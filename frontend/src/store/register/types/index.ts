export type RegisterFormData = {
    name: string
    email: string
    phoneNumber: string
    password: string
}
export type RegisterStore = {
    data: RegisterFormData,
    success: boolean
    loading: boolean
    update: (key: string, value: string) => void
    submit: () => Promise<void>
    reset: () => void
}