import Perso from './class/perso.class.js';

class Program {
    constructor() {
        // les propriétés de nos personnages avec leurs valeurs par défaut 
        this.squall = new Perso('Squall', 250, 50, 7, 130);
        this.bahamut = new Perso('Bahamut', 250, 60, 8, 180);
    
        // appeler la fonction display qu'on va définir plus bas
        this.display();

        // mettre en place les eventlistener sur les boutons : attaquer, défendre, sort
        $('#attack').on('click', (e) => this.onClickAttack(e));
        $('#defense').on('click', (e) => this.onClickDefense(e));
        $('#spell').on('click', (e) => this.onClickSpell(e));
    }

    display() {
        /* afficher le nombre de point de vie, de la force, d'armes et du sort de chaque joueur
            en prenant en compte le déroulement du jeu et afficher le vainqueur
            Au départ donc, ils ont tous les deux leurs valeurs de base
        */
        
        if (this.squall.pv > 0 && this.bahamut.pv > 0) {
            $('#monster').text(`${this.squall.name} : ${this.squall.pv} PV || Forces : ${this.squall.strength} || Armes : ${this.squall.armor} || Sort : ${this.squall.mp} `);
            $('#hero').text(`${this.bahamut.name} : ${this.bahamut.pv} PV || Forces : ${this.bahamut.strength} || Armes : ${this.bahamut.armor} || Sort : ${this.bahamut.mp} `);
        } else {
            $('#control').css('display', 'none')

            // si le monstre gagne
            if (this.squall.pv > 0) {
                $('#display').html(`<p>${this.squall.name} Le fantôme de la terreur a gagné !</p>`);
            } 
            // si le hero gagne
            else {
                $('#display').html(`<p>Bravo petit ${this.bahamut.name}</p>`);
            }
        }
    }
    
    onClickAttack(e) {
        e.preventDefault();

        // clear le log d'affichage 
        $('#log').empty();

        // le monstre attaque en premier le hero
        this.squall.attack(this.bahamut);

        // l'autre réplique, donc on va faire appel à la fonction counter définit plus bas
        this.counter();

        // mettre à jour l'affichage
        this.display();
    }

    counter() {
        this.bahamut.attack(this.squall);
    }


    
}

export default Program;
   