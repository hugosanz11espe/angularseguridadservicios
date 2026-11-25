import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Empleado } from "../../models/empleado";
import { environment } from "../../environments/environment.development";
import { Login } from "../../models/login";

@Injectable()

export class ServiceEmpleados {
    constructor(
        private _http: HttpClient
    ){}

    async getEmpleadosAsync(): Promise<Empleado[]> {
        let request = "api/empleadosauth"
        let url = environment.apiejemplos + request
        return firstValueFrom(
            this._http.get<Empleado[]>(url)

        )
    }

    async getPerfilAsync(): Promise<Empleado> {
        let request = "api/empleadosauth/perfilauth"
        let url = environment.apiejemplos + request
        let token = localStorage.getItem("TOKEN")
        let header = new HttpHeaders().set("Authorization","bearer " + token)
        return firstValueFrom(
            this._http.get<Empleado>(url, {headers: header})

        )
    }

        
    async logInEmpleadosAsync(login: Login): Promise<any> {
        let request = "api/authempleados/login"
        let url = environment.apiejemplos + request
        let header = new HttpHeaders().set("content-type", "application/json")
       
        try {
             let data: any = await firstValueFrom(
            this._http.post(url, login, {headers: header})
        ) 
       console.log(data.response)
        return data.response

        } catch (error){
            console.log("errores de login")
            throw error;
        }
    }
}