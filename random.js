
/* function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
} */
const names = [
    "Taha",
    "Mohamed Taha",
    "Ayman1",
    "Ayman2",
    "Ramadan",
    "Amr",
    "Sameh",
    "Mina",
    "Osama",
    "Bosy",
    "Ahmed Adel"
];


names.sort(() => Math.random() - 0.5);


let i = 2;

for (let name of names) {
    console.log(`${i++} : ${name}`);
};