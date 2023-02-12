import { Injectable } from "@angular/core";
import {createClient, SupabaseClient} from '@supabase/supabase-js'
import { initSupabase } from "src/app/utils/initSupabase";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    supabase : SupabaseClient = createClient(initSupabase.supabaseUrl, initSupabase.supabaseKey);

    async addBoardTemplate(name: string, template: JSON){
        const {data: boards, error} = await this.supabase
        .from('boards')
        .insert({name, template})
        return {data: boards, error}
    }

    async getTemplateByName(name: string){
        let { data: boards, error} = await this.supabase
        .from('boards')
        .select(name)
    }
}

