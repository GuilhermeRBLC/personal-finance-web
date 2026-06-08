import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountsService, Account } from '../../services/accounts/accounts';

@Component({
  selector: 'app-accounts',
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss',
})
export class Accounts implements OnInit {
  
  accounts = signal<Account[]>([]);

  accountData:Account = {
    id: 0,
    name: '',
    balance: 0
  };

  isEditing = false;

  private accountsService = inject(AccountsService);

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountsService.getAccounts().subscribe({
      next: (data) => {
        this.accounts.set(data);
      },
      error: (err) => console.error('Erro ao buscar contas:', err)
    });
  }

  onSubmit() {
    if (this.isEditing && this.accountData.id !== null && this.accountData.id !== undefined) {
      this.accountsService.updateAccount(this.accountData.id, this.accountData).subscribe({
        next: () => {
          this.loadAccounts();
          this.resetForm();
        },
        error: (err) => console.error('Erro ao atualizar conta:', err)
      });
    } else {
      this.accountsService.createAccount(this.accountData).subscribe({
        next: () => {
          this.loadAccounts();
          this.resetForm();
        },
        error: (err) => console.error('Erro ao criar conta:', err)
      });
    }

    this.resetForm();
  }

  editAccount(account: Account) {
    this.isEditing = true;
    this.accountData = {
      id: account.id || 0,
      name: account.name,
      balance: account.balance
    };
  }

  deleteAccount(id: number | undefined) {
    if (!id) return;

    if (confirm('Tem certeza que deseja excluir esta conta?')) {
      this.accountsService.deleteAccount(id).subscribe({
        next: () => {
          this.loadAccounts();
          if (this.accountData.id === id) this.resetForm();
        },
        error: (err) => console.error('Erro ao excluir conta:', err)
      });
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.isEditing = false;
    this.accountData = {
      id: 0,
      name: '',
      balance: 0
    };
  }

}
