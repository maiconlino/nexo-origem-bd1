import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '@/app/chatgpt-auth';
export async function teacher(){const user=await getChatGPTUser();return !!(user&&env.TEACHER_EMAIL&&user.email.toLowerCase()===env.TEACHER_EMAIL.toLowerCase());}
export async function results(){if(!env.DB)throw Error('Banco indisponível');const rows=await env.DB.prepare('SELECT id,mode,name,email,score,state,stage,created,completed FROM attempts ORDER BY created DESC').all<any>();return rows.results;}
