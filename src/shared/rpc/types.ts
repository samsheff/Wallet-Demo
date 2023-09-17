export type RpcRequest = {
    method: string,
    params: Array<any>
}

export type WalletRpcData = {
    requestId: number,
    type: WalletRequestType,
    data: Array<RpcRequest>
}

export enum WalletRequestType {
    Request,
    Response,
    ConflictRequest,
    ConflictResponse
}