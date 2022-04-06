import Perso from './perso.class.js';
console.log('perso -->', Perso);
import getRandomInteger from '../utilities.js'
console.log('getRandomInteger -->', getRandomInteger);

class Program {
    constructor() {
        // les propriétés de nos personnages avec leurs valeurs par défaut 
        this.player = new Perso('Bahamut', 280, 50, 7, 130);
        this.dragon = new Perso('Fantomas', 250, 60, 8, 150);
    
        // appeler la fonction display qu'on va définir plus bas
        this.display();

        //gestionnaire d'événement qui appeleront nos fonctions d'attaque de sort ou de défense
	    document.querySelector("#attaquer").addEventListener("click", this.onClickAttack.bind(this))
	    document.querySelector("#defendre").addEventListener("click", this.onClickDefense.bind(this))
	    document.querySelector("#sort").addEventListener("click", this.onClickSpell.bind(this))
    }

    display() {
        /* afficher le nombre de point de vie, d'attaque, de défense et du sort de chaque joueur
            en prenant en compte le déroulement du jeu et afficher le vainqueur
            Au départ donc, ils ont tous les deux leurs valeurs de base
        */
        
        if (this.player.hp > 0 && this.dragon.hp > 0) {

            $('#info p').html(`
            
                <p>Les atouts de ${this.player.name} :</p>
                <p>PV : ${this.player.hp} || Attaque : ${this.player.attackPoint} || Défense : ${this.player.defensePoint} || Sort : ${this.player.spellPoint}
                
                <p>Les atouts de ${this.dragon.name} :</p>
                PV : ${this.dragon.hp} || Attaque : ${this.dragon.attackPoint} || Défense : ${this.dragon.defensePoint} || Sort : ${this.dragon.spellPoint}
                
            `);
	      
        } else {
            $('#control').css('display', 'none')

            // si les points de vie de Bahamut sont épuisés, Fantomas gagne
            if (this.player.hp <= 0) {
                $('#info p').html(`<p>${this.dragon.name} Le fantôme de la terreur a gagné !</p>`);
            } 
            // si Bahamut gagne
            else {
                $('#info p').html(`<p>Bravo petit ${this.player.name} !</p>`);
            }
        }
    }
    
    onClickAttack(e) {
        e.preventDefault();

        // clear le log d'affichage pour pouvoir afficher les autres paramètres d'affichage
        $('#info p').empty()

        // le joueur attaque en premier
        this.player.attack(this.dragon);

        // l'autre réplique, donc on va faire appel à la fonction counter définit plus bas
        this.counter();

        // mettre à jour l'affichage
        this.display();
    }

    onClickDefense(e) {
        e.preventDefault()

        // clear le log d'affichage pour pouvoir afficher les autres paramètres d'affichage
        $('#info p').empty()

        // le héros se défend à l'attaque du monstre
        this.player.defense()

        // l'autre réplique
        this.counter()

        // mettre à jour l'affichage
        this.display()
    }

    onClickSpell(e) {
        e.preventDefault();

        // clear le log d'affichage pour pouvoir afficher les autres paramètres d'affichage
        $('#info p').empty()

        // si le joueur a des points de sort
        if (this.player.spellPoint > 0) {
            // il lance un sort à Fantomas
            this.player.spell(this.dragon)

            // le monstre va contrer le sort
            this.counter()

            // on met à jour l'affichage
            this.display()
        } else {
            $('#info p').html(`<p> Vous avez épuiser vos nombres de sort !</p>`)
        }
    }

    counter() {
        // lancer un random number pour contrer
        let random = getRandomInteger(1,3)

        switch (random) {
            case 1:
                // si le dragon fantomas attaque petit bahamut
                this.dragon.attack(this.player)
                break;

            case 2:
                // si le dragon a des points de sort et en envoie sur le joueur
                if (this.dragon.spellPoint > 0) {
                    this.dragon.spell(this.player)
                } 
                // sinon on relance le contre
                else {   
                    this.counter()
                }
                break;

            case 3:
                // si le dragon se défend
                this.dragon.defense()
                break;
        }  
    }
}

export default Program