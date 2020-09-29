import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const poolData = {
    //Cognito : c'est la pool "angular" de chez Lucie AWS
    UserPoolId: 'eu-west-2_e484206gJ',
    ClientId:'1aeh8ani06hhu3eota6bgujuv7' 
};

const userPool = new CognitoUserPool(poolData); 

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {

    cognitoUser : any;

    constructor(){ }

    register(email,password){
        const attributeList = [];

        return Observable.create(observer => {
            userPool.signUp(email, password, attributeList, null, (err,result) => {
                if(err){
                    console.log(JSON.stringify(err));
                    observer.error(err);
                }
                this.cognitoUser = result.user;
                console.log("signUp success", result);
                observer.next(result);
                observer.complete();
            });
        });
    }

    signIn(email,password){ 
        const authenticationData = {
            Username : email, 
            Password : password
        };
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        const userData ={
            Username: email,
            Pool: userPool
        };
        const cognitoUser = new CognitoUser(userData);
        return Observable.create(observer=>{
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function(result){
                    console.log(result);
                    observer.next(result);
                    observer.complete();
                },
                onFailure: function(err){
                    console.log(err);
                    observer.error(err);
                },
            });
        });

        //bonus pour la suite envoyée par Mohamadou:
        //source : https://datacadamia.com/aws/cognito/js_identity#changing_password
        // cognitoUser.changePassword('oldPassword', 'newPassword', function(err, result) {
        //     if (err) {
        //         alert(err);
        //         return;
        //     }
        //     console.log('call result: ' + result);
        // });
    }


    isLoggedIn(){
        return userPool.getCurrentUser() != null;
    }


    confirmAuthCode(code){
        const user = {
            Username : this.cognitoUser.username,
            Pool : userPool
        };
        return Observable.create(observer =>{
            const cognitoUser = new CognitoUser(user);
            cognitoUser.confirmRegistration(code, true, function(err, result){
                if(err){
                    console.log(err);
                    observer.error(err);
                }
                console.log("confirmAuthCode() success", result);
                observer.next(result);
                observer.complete();
            });
        });
    }

    getAuthenticatedUser(){
        return userPool.getCurrentUser();
    }

    logOut(){
        this.getAuthenticatedUser().signOut();
        this.cognitoUser = null;
    }


}