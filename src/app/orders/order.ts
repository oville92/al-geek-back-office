import { IInfosBank } from './infosBank';
import { ILigneCommande } from './ligneCommande';

export interface IOrder {

    id: number;
    listLigneCommande: ILigneCommande[];
    dateDeLaCommande: Date;
    clientId: number;
    infosBank: IInfosBank;
    prix: number;

    // constructor(
    //     id: number,
    //     listLigneCommande: ILigneCommande[],
    //     dateCommande: Date,
    //     clientId: number,
    //     infosBank: IInfosBank,
    //     prix: number
    // ) 

}