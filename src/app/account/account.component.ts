import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from './account.service';
import { Account } from '../Models/account';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, AfterViewInit {
  
  
  displayedColumns: string[] = ['id', 'clientName', 'cpf_Cnpj', 'bankCode', 'accountNumber','agencyNumber','openingDate','status','opcoes'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public formAccount: FormGroup;
  public listContas: Account[];
  public accountSelected: Account;
  public accountNew: string;
  modo = 'post';
  public idDisabled = 'true';
  listData: MatTableDataSource<Account>;

  constructor(private fb: FormBuilder,
              private accountService: AccountService) { 
    this.PreencherListContes();
    // this.loadAccounts();
    
    this.createForm();
  }
  
  ngOnInit(): void {
    this.loadAccounts();
    // setTimeout(() => this.listData.paginator = this.paginator);
    // setTimeout(() => this.listData.sort = this.sort);
  }

  ngAfterViewInit() {    
    // this.loadAccounts();
    
    // this.listData.sort = this.sort;
    // this.listData.paginator = this.paginator;
  }

  

  // loadPaginator(){
  //   this.listData.sort = this.sort;
  //   this.listData.paginator = this.paginator;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();

    if (this.listData.paginator) {
      this.listData.paginator.firstPage();
    }
  }



  PreencherListContes(){

  }


  loadAccounts(){
    this.accountService.getAll().subscribe(
      (accounts: Account[]) => {
        // console.log(accounts),
        this.listContas = accounts,
        this.listData = new MatTableDataSource(this.listContas);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        
      },
      (erro: any) => {
        console.error(erro);
      }
    )
  }
  
  createForm(){
    this.formAccount = this.fb.group({
      id: [0]
      ,clientName: ["", [Validators.required,Validators.minLength(5)]]
      ,cpf_Cnpj: ["",[Validators.required,Validators.minLength(14)]]
      ,bankCode: [0, Validators.required]
      ,accountNumber: ["",Validators.required]
      ,agencyNumber: ["",Validators.required]
      ,openingDate: ["",Validators.required]
      ,status: [false, Validators.required]
    });
  }

  public SelectAccount(accountReiceved: Account){
    this.accountSelected = accountReiceved;
    this.formAccount.patchValue(accountReiceved);
    this.accountNew = "Conta bancária detalhes";
  }

  public NewAccount(){
    
    this.accountSelected = new Account();
    this.formAccount.patchValue(this.accountSelected);
    this.accountNew = "Nova Conta";
  }

  public BackToAccounts(){
    this.accountSelected = null;
    this.loadAccounts();
  }  

  createAccount(account: Account){
    this.accountService.post(account).subscribe();
  }

  SaveAccount(account: Account){
    (account.id === 0) ? this.modo = 'post' : this.modo = 'put';

    this.accountService[this.modo](account).subscribe(
      (warning: string) => {
        console.log(warning);
        alert(warning); 
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  // public dataSource: any = this.listContas;

  public SendDataFormAccount(){
    this.SaveAccount(this.formAccount.value);
    
  }

  public DeleteAccount(id: number){
    this.accountService.delete(id).subscribe(
      (model: any) => {
        console.log(model);        
        this.loadAccounts();
      },
      (erro: any) => {
        console.error(erro);
      }
    );

    this.loadAccounts();
  }

  get getControl(){
    return this.formAccount.controls;
  }
}

// export class InputClearableExample {
//   value = 'Favor entrar com data estilo Norte-Americano';
// }