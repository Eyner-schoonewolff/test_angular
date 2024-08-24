export interface Notification {
    id: number,
    user_id: number,
    title: string,
    description: string,
    status: number,
    deleted: number,
    deleted_date: Date,
    creation_date: Date,
    user_name: string,
    user_last_name: string
}


export interface StatusNotification {
    id:number,
    status:number
}