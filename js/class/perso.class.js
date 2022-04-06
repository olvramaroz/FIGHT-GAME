import getRandomInteger from '../utilities.js'

/*
On doit construire le modèle de données des personnages qu'on va manipuler.
"this" fait référence à la class Perso ici

Une class est un modèle qui a l'avantage d'être modulaire => qu'on peut exporter
pour le mettre à disposition des autres fichiers js qu'on va manipuler
*/

class Perso {
    constructor(name, hp, attackPoint, defensePoint, spellPoint) {
        this.name = name;
        this.hp = hp;
        this.attackPoint = attackPoint;
        this.defensePoint = defensePoint;
        this.spellPoint = spellPoint;
    }

    attack(perso) {
	    // creation d'une variable dmg qui va se faire affecter par la soustraction de l'attaque sur la défense
	    let damage = this.attackPoint - perso.defensePoint

	    // si les dmg sont inférieur à 10
	    if (damage < 10) {
	        // ajout d'un message que le perso ne sent pas les dmg
	        $("#info p").append(`${perso.name} ne sent plus rien.`);
	    	damage = 10
	    }

	    // on soustrait les hp en fonction des dmg
		perso.hp -= damage
		
		// message de qui attaque de combien de dmg
		$("#info p").append(`${this.name} attaque et enlève ${damage} points de dégats à ${perso.name}<br>`);
		
		// si opponent (perso) a moins de 0 hp
		if (perso.hp <= 0) {
			// on affecte 0 à ses hp
	        perso.hp = 0;
		}        

		// message qui récapitule les HP restants de l'opponent
	   $("#info p").append(`${perso.name} a ${perso.hp} points de vie`);
    }

    defense() {
        // on doit calculer un ratio de défense qu'on va distribuer entre les joueurs
	    let ratio =  Math.round(this.defensePoint * Math.random());

        // message pour informer qu'un joueur a augmenté ses points de défense
		$("#info p").append(`${this.name} a augmenté sa défense de ${ratio} points.<br>`);

        // on doit redéfinir le nombre de défense entre les deux joueurs
	    this.defensePoint += ratio / 2;

        // afficher les nouveaux points
	    $("#info p").append(`${this.name} a une défense de ${this.defensePoint} points.<br>`);
    }

    spell(perso) {
        // s'il reste suffisamment de nombre de sort
		if (this.spellPoint > 0) {

	        // calculer le nombre de damage
			let damage = getRandomInteger(1, this.spellPoint);
	        
            // afficher quand l'attaquant jette un sort à l'opponent
            $("#info p").append(`${this.name} jète un sort et enlève ${damage} points de vie à ${perso.name}`);
	        
            // recalcul des points de vie et des nombres de sort
	        perso.hp -= damage;
	        this.spellPoint -=  damage;

	        // si l'attaqué n'a plus de point de vie, on doit redéfinir son nombre de point de vie à zéro
	        if  (perso.hp <= 0) {
	            perso.hp = 0;
	        }
			$("#info p").append(`${perso.name} a ${perso.hp} points de vie<br>`)
		} else {
	        // si nombre de sort épuisé
	        $("#info p").append('Vos points de sort sont épuisés !');
		}
    }
}

export default Perso