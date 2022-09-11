export const splitAddress = (address: string) =>
    address?.toLowerCase()?.slice(0, 8) + "..." + address?.toLowerCase()?.slice(-4)

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
