import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  addDoc,
  doc,
  deleteDoc,
  setDoc,
  getFirestore,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  QueryConstraint,
  Timestamp
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Funcionario } from '../interfaces/funcionario';
@Injectable({
  providedIn: 'root'
})
export class FbfuncionarioService {
  private reclamoRef = collection(this.firestore, 'funcionarios');
  funcionario:Funcionario | undefined
  constructor(private firestore: Firestore,private router: Router,) { }
  loginFuncionario({ username, password }: any) {
    const wa: QueryConstraint[] = [where('username', '==', username), where('password', '==', password)]
    const refQuery = query(this.reclamoRef, ...wa)
    collectionData(refQuery, { idField: 'id' }).subscribe((user) => {
      if (user.length > 0) {
        this.funcionario = user[0]
        const funcionarioString = JSON.stringify(this.funcionario)
      localStorage.setItem("funcionario", funcionarioString);
        this.router.navigate(['dashboard/bienvenido']);
      }else{
        console.log("error al intentar iniciar session");
      }
    })
  }
  logOutFuncionario() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
