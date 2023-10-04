//Tipos Básicos
let number: number = 5;
const Firstname: string = 'Felipe';
const isValid: boolean = true;

console.log(number)

const ids: number[] = [1, 2, 3, 4, 5]
const booleans: boolean[] = [false, true]
const names: string[] = ['Felipe','Jane']

// Tupla
const person: [number, string] = [1, 'Jane']

// lista de Tuplas
const people: [number, string][]=[
    [1, 'jane'],
    [2, 'joe'],
];

// Intersections
const productId: string | number | boolean = false

// Enum
enum Direction {
    Up = 1,
    Down = 2,
}

// Type Assertions
const productname: any = 'boné'
let itemId = <string>productname;