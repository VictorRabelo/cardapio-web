import { KEY_DETALHE_PRODUTO } from './../utils/constants';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { SeverityMessage } from "../enums/severity-message.enum";
declare var $: any;

@Component({
    template: ''
})
export abstract class ControllerBase implements OnInit, OnDestroy {

    showMessageAlert: boolean;
    messageAlert: string;
    severityAlert: SeverityMessage;

    ngOnInit(): void {
    }
    
    ngOnDestroy(): void {
    }

    showAlertErrorPN(msg: string) {
        this.messageAlert = msg;
        this.showMessageAlert = true;
        this.severityAlert = SeverityMessage.ERROR;
    }

    showAlertWarnPN(msg: string) {
        this.messageAlert = msg;
        this.showMessageAlert = true;
        this.severityAlert = SeverityMessage.WARN;
    }

    showAlertInfoPN(msg: string) {
        this.messageAlert = msg;
        this.showMessageAlert = true;
        this.severityAlert = SeverityMessage.INFO;
    }

    closeAlertPN() {
        this.messageAlert = undefined;
        this.showMessageAlert = false;
        this.severityAlert = undefined;
    }

    setProdutosDetalhe(produto: any) {
        localStorage.setItem(KEY_DETALHE_PRODUTO, JSON.stringify(produto));
    }
    
    getProdutosDetalhe(): any {
        return JSON.parse(localStorage.getItem(KEY_DETALHE_PRODUTO));
    }

}