'use server'
import { getIronSession } from "iron-session"
import { ISessionData } from './app/lib/definitions'
import { cookies } from "next/headers"
import { sessionOptions } from "./app/config/sessionConfig"

export const getSessionData = async (): Promise<ISessionData> => {
  const session = await getIronSession<ISessionData>(await cookies(), sessionOptions)
  const serializedSession = JSON.parse(JSON.stringify(session))
  return serializedSession
}

export const getSession = async () => await getIronSession<ISessionData>(await cookies(), sessionOptions)

export const sessionUserId = async () => {
  const sessionData = await getSessionData()
  return sessionData.userId
} 

export const sessionUsername = async (): Promise<string> => {
  const sessionData = await getSessionData()
  return sessionData.username
} 