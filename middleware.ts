import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { sessionUserId } from './session'

export default async function middleware(req: NextRequest){
  const path = req.nextUrl.pathname

  const userId = await sessionUserId()

  if(path === '/' && !userId) return NextResponse.redirect(new URL('/signin', req.nextUrl))

  return NextResponse.next()
}