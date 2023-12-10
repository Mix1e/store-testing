
export enum EState {
    PENDING='PENDING',
    READY='READY',
    ERROR='ERROR'
}

export interface IMessageModel {
    state: EState;
    messages?: IMessageItem[];
    error?: string;
}

export interface IMessageItem {
    id: number,
    content: string,
}
