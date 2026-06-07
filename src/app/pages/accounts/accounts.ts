import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Definindo a interface para tipar nossa Conta
interface Account {
  id: number;
  name: string;
  balance: number;
}

@Component({
  selector: 'app-accounts',
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss',
})
export class Accounts {
  
  accounts: Account[] = [
    { id: 1, name: 'Conta Corrente - Itaú', balance: 1500.50 },
    { id: 2, name: 'Carteira', balance: 120.00 },
    { id: 3, name: 'Reserva de Emergência', balance: 5000.00 }
  ];

  accountData = {
    id: null as number | null,
    name: '',
    balance: 0
  };

  isEditing = false;

  onSubmit() {
    if (this.isEditing && this.accountData.id !== null) {
      const index = this.accounts.findIndex(a => a.id === this.accountData.id);
      if (index !== -1) {
        this.accounts[index] = {
          id: this.accountData.id,
          name: this.accountData.name,
          balance: this.accountData.balance
        };
      }
      this.isEditing = false;
    } else {
      const newAccount: Account = {
        id: Date.now(),
        name: this.accountData.name,
        balance: this.accountData.balance
      };
      this.accounts.push(newAccount);
    }

    this.resetForm();
  }

  editAccount(account: Account) {
    this.isEditing = true;
    this.accountData = {
      id: account.id,
      name: account.name,
      balance: account.balance
    };
  }

  deleteAccount(id: number) {
    if (confirm('Tem certeza que deseja excluir esta conta?')) {
      this.accounts = this.accounts.filter(account => account.id !== id);
      // Se estivesse editando a conta excluída, limpa o formulário
      if (this.accountData.id === id) {
        this.resetForm();
      }
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.isEditing = false;
    this.accountData = {
      id: null,
      name: '',
      balance: 0
    };
  }

}
