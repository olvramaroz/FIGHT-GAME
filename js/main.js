/*
    Nous allons importer Program ici dans main.
    Main est notre appli principale qui va lancer
    réellement le jeu.
    Program est notre appli qui contient le déroulement même du jeu

*/

import Program from './class/program.class.js';

const launch = new Program();
console.log('launch -->', launch);