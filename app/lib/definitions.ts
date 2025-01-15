export interface ITask{
  id: string
  task: string
  isChecked: boolean
}

export interface IMessage{
  ok: true | false
  message?: string | any[] | null
}

export interface ISessionData{
  userId?: string
  username: string
}