'use server'

import { supabase } from "@/app/config/supabaseClient"
import { IMessage } from "../definitions"
import { sessionUserId } from "@/session"

export const all = async (): Promise<IMessage> => {
  try{
    const currentUserId = await sessionUserId()
    const { data: todoList, error: selectError } = await supabase
      .from('todoList')
      .select()
      .eq('user_id', currentUserId)
      .order('created_at', { ascending: false })

    if(selectError) throw new Error('Something went wrong, try again')

    return { ok: true, message: todoList }
  }
  catch(err){
    return err instanceof Error ? {ok: false, message: err.message} : {ok: false, message: 'Unhandled error'}
  }
}

export const add = async (prevState: any, formData: FormData): Promise<IMessage> => {
  try{
    const task = formData.get('task')
    const currentUserId = await sessionUserId()

    const { error: insertError } = await supabase
      .from('todoList')
      .insert({ task, user_id: currentUserId })

    if(insertError) throw new Error('Something went wrong, try again')

    return {ok: true, message: 'Task added successfully'}
  }
  catch(err){
    return err instanceof Error ? {ok: false, message: err.message} : {ok: false, message: 'Unhandled error'}
  }
}

export const remove = async (taskId: string): Promise<IMessage> => {
  try{
    if(!taskId) throw new Error('Invalid task id')
      
    const { data: deleteData, error: deleteError } = await supabase
      .from('todoList')
      .delete()
      .eq('id', taskId)
      .select()

    if(deleteError) throw new Error('Something went wrong, try again')
      
    return {ok: true, message: 'Task removed successfully'}
  }
  catch(err){
    console.log(5)
    return err instanceof Error ? {ok: false, message: err.message} : {ok: false, message: 'Unhandled error'}
  }
}

export const setCheckbox = async (taskId: string, isChecked: boolean): Promise<IMessage> => {
  try{
    const { error: updateError } = await supabase
      .from('todoList')
      .update({ isChecked })
      .eq('id', taskId)

    if(updateError) throw new Error('Something went wrong, try again')

    return {ok: true, message: 'Task checkbox set successfully'}
  }
  catch(err){
    return err instanceof Error ? {ok: false, message: err.message} : {ok: false, message: 'Unhandled error'}
  }
}