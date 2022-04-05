/*
On doit construire le modèle de données des personnages qu'on va manipuler.
"this" fait référence à la class Perso ici

Une class est un modèle qui a l'avantage d'être modulaire => qu'on peut exporter
pour le mettre à disposition des autres fichiers js qu'on va manipuler
*/

class Perso {
    constructor(name, pv, strength, armor, mp) {
        this.name = name;
        this.pv = pv;
        this.strength = strength;
        this.armor = armor;
        this.mp = mp;
    }

    attack(opponent) {
        console.log('opponent',opponent);
        
    }

    defense(opponent) {

    }

    spell() {

    }
}

export default Perso;

/////////////////////////////////////////////////


