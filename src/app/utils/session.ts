export class Session {

    private static instance: Session;

    tenant: string;
    produtoDetalhe: any;
    
    // Bloquea a instancia por fora
    private constructor() {}

    public static getInstance(): Session {
        if(!Session.instance) {
            Session.instance = new Session();
        }
        return Session.instance;
    }

    public static clearInstance(): void {
        this.instance = null;
    }

}