import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class Messages {

    constructor(private messageService: MessageService) {}

    showMessageError(msg: string) {
        this.messageService.add({severity: 'error', summary: 'Alerta de erro', detail: msg, life: 6000});
    }

    showMessageWarn(msg: string) {
        this.messageService.add({severity: 'warn', summary: 'Alerta de aviso', detail: msg, life: 6000});
    }

    showMessageSuccess(msg: string) {
        this.messageService.add({severity: 'success', summary: 'Alerta de sucesso', detail: msg, life: 6000});
    }

    showMessageInfo(msg: string) {
        this.messageService.add({severity: 'info', summary: 'Alerta de informação', detail: msg, life: 6000});
    }

}