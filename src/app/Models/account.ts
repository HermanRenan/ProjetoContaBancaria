export class Account {
    
    constructor() {
        this.id = 0;
        this.bankCode= 0;
        this.accountNumber = '';
        this.agencyNumber = '';
        this.cpf_Cnpj = '';
        this.clientName = '';
        this.status = false;
        this.openingDate = '';           
    }
    
    id: number;
    bankCode: number;
    accountNumber: string;
    agencyNumber: string;
    cpf_Cnpj: string;
    clientName: string;
    status: boolean;
    openingDate: string;
}
