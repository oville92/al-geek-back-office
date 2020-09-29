export interface ICustomer {

    //bonne pratique : migrer l'interface vers dossier models 
    id: number ;
    nom: string ;
    prenom: string ;
    email: string ;
    login: string ;
    hashedPassword: string ;
    salt: string ;
    adresse: string ;
    codePostal: string ;
    ville: string ;

}