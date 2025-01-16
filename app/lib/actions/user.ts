'use server'

import { supabase } from '@/app/config/supabaseClient'
import { hashPassword, comparePassword } from '@/app/config/bcryptHelper'
import { getSession } from '@/session'
import { IMessage } from '../definitions'
import { redirect } from 'next/navigation'

export const signup = async (prevState: any, formData: FormData): Promise<IMessage> => {
  try{

    const username = formData.get('username')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')
    
    const { data: existingRows, error: selectError } = await supabase
      .from('users')
      .select('username')
      .eq('username', username)

    if(selectError) throw new Error('Something went wrong, try again')

    if(existingRows && existingRows.length > 0) throw new Error('Username already taken')

    if(password !== confirmPassword) throw new Error('Passwords do not match')

    const hashedPassword = await hashPassword(password)

    const { error: insertError } = await supabase
      .from('users')
      .insert({username, password: hashedPassword})

    if(insertError) throw new Error('Something went wrong, try again')

    return {ok: true, message: 'Sign up success!'}
  }
  catch(err){
    return err instanceof Error ? {ok: false, message: err.message} : {ok: false, message: 'Unhandled error'}
  }
}

export const signin = async (prevState: any, formData: FormData): Promise<IMessage> => {
  try{

    const username = formData.get('username')
    const password = formData.get('password')

    const { data: existingRows, error: selectError } = await supabase
    .from('users')
    .select()
    .eq('username', username)
    .single()

    if(selectError && selectError.code === 'PGRST116') throw new Error('Invalid credentials')
    if(selectError) throw new Error('Something went wrong, try again')
    
    if(existingRows){
      const isPasswordValid = await comparePassword(password, existingRows.password);

      if(isPasswordValid) {
        const session = await getSession()

        session.userId = existingRows.id
        session.username = existingRows.username
        await session.save()

        return {ok: true, message: 'Sign in success!'}
      }
    }

    return {ok: false, message: 'Invalid credentials'}
  }
  catch(err){
    return err instanceof Error ? {ok: false, message: err.message} : {ok: false, message: 'Unhandled error'}
  }
}

export const logout = async () => {
  const session = await getSession()
  session.destroy()
  redirect("/signin");
}