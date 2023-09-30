import { Injectable } from '@angular/core';
import { Auth, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Observable } from 'rxjs';
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
  Timestamp,
  DocumentData,
  updateDoc,
  orderBy
} from '@angular/fire/firestore';
import { MyReclamo } from '../interfaces/reclamos';
import { Funcionario } from '../interfaces/funcionario';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private reclamoRef = collection(this.firestore, 'reclamos');

  constructor(private auth: Auth, private firestore: Firestore, private router: Router,) { }

  getAllReclamos(categorias:string[]): Observable<MyReclamo[]> {
    // const funcionario:Funcionario = JSON.parse(localStorage.getItem("funcionario")!);
    const wa: QueryConstraint[] = [where('categoria', "in", categorias),orderBy('fecha','asc')]
    const refQuery = query(this.reclamoRef, ...wa)
    return collectionData(refQuery, { idField: 'id' }) as Observable<MyReclamo[]>;
  }

  getReclamoByEstado(estado: string): Observable<MyReclamo[]> {
    const funcionario:Funcionario = JSON.parse(localStorage.getItem("funcionario")!);
    const wa: QueryConstraint[] = [where('estado', '==', estado), where('categoria', '==', funcionario.area),orderBy('fecha','asc')]
    const refQuery = query(this.reclamoRef, ...wa)
    return collectionData(refQuery, { idField: 'id' }) as Observable<MyReclamo[]>;
  }
  // getReclamoByCategoria(categoria: string): Observable<MyReclamo[]> {
  //   const funcionario:Funcionario = JSON.parse(localStorage.getItem("funcionario")!);
  //   const wa: QueryConstraint[] = [where('categoria', '==', categoria), where('categoria', '==', funcionario.area),orderBy('fecha','asc')]
  //   const refQuery = query(this.reclamoRef, ...wa)
  //   return collectionData(refQuery, { idField: 'id' }) as Observable<MyReclamo[]>;
  // }
  getReclamoByFecha(fechaIni: Date, fechaFin: Date): Observable<MyReclamo[]> {
    const funcionario:Funcionario = JSON.parse(localStorage.getItem("funcionario")!);
    const ini = new Date(fechaIni);
    const fin = new Date(fechaFin);
    const wa: QueryConstraint[] = [where('fecha', '>=', Timestamp.fromDate(ini)),
    where('fecha', '<=', Timestamp.fromDate(fin)),
    where('categoria', '==', funcionario.area),orderBy('fecha','asc')]
    const refQuery = query(this.reclamoRef, ...wa)
    return collectionData(refQuery, { idField: 'id' }) as Observable<MyReclamo[]>;
  }

  async getReclamo(id: string): Promise<MyReclamo> {
    const docRef = doc(this.firestore, 'reclamos', id);
    const docSnap = await getDoc(docRef);
    return docSnap.data()!;
  }

  chageEstado(newEstado: string, id: string) {
    const docRef = doc(this.firestore, 'reclamos', id);
    const data = { estado: newEstado }
    updateDoc(docRef, data).then(docRef => {
      this.router.navigate(['/dashboard/allreclmos']);
    }).catch(error => {
      console.log(error);
    })
  }
  chageArea(area: string, id: string) {
    const docRef = doc(this.firestore, 'reclamos', id);
    const data = { categoria: area }
    updateDoc(docRef, data).then(docRef => {
      this.router.navigate(['/dashboard/allreclmos']);
    }).catch(error => {
      console.log(error);
    })
  }
  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  losCurrentUsers() {
    return this.auth.currentUser;
  }
  enviarVerificacionDeCorreo() {
    return sendEmailVerification(this.auth.currentUser!);
    // return this.auth.currentUser?.emailVerified
  }
}
