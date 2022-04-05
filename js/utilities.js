/*
    On récupère des nombres aléatoires entre min et max
*/

function getRandomInteger() {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}