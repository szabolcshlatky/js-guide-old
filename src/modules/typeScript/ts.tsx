/** TypeScript (after setup tsconfig.json and @types/ for packages)
 * 1) Simple type assignment (primitive datatypes) in Implicit and Explicit way.
 * 2) Special types (any, unknown, never), type casting
 * 3) Arrays & Tuples (+ readonly)
 * 4) Objects (+ optional properties, index signatures)
 * 5) Enums (numeric, string)
 * 6) Aliases & Interfaces
 * 7) Union types
 * 8) Functions (+ return types, void, parameters, rest parameter)
 * 9) Casting
 * 10) Classes
 * 11) Generics
 * 12) Utility Types (Partial, Required, Record, Omit, Pick, Exclude, ReturnType, Parameters, Readonly)
 * 13) Keyof
 * 14) Undefined & Null
 * 15) Template Literal Types
 * 16) Index Signature Labels
*/

/* 1) Simple type assignment TS will throw an error if the types are not matching */

  /* Implicit: TS will infer (guess) the type of the variable */
let implict = 5; //

  /* Explicit (better) */
let explicit: number = 5; //
let str: string = "Hello World";
let bool: boolean = true;

    /* These types (undefined, nukk) don't have much use unless strictNullChecks is enabled in the tsconfig.json file. */
let y: undefined = undefined;
let z: null = null;

/* 2) Special types */

  /* ANY can be a useful way to get past errors since it disables type checking, but TS will not be able provide type safety, and tools which rely on type data, such as auto completion, will not work. Remember, it should be avoided at "any" cost...  */
let v: any = true;
v = "string"; // no error as it can be "any" type
Math.round(v); // no error as it can be "any" type

  /* UNKNOWN is best (better alternative to any) used when you don't know the type of data being typed. To add a type later, you'll need to cast it. */
let w: unknown = 1;
w = "string"; // no error

  /* CASTING is when we use the "as" keyword to say property or variable is of the casted type. */
w = {
  runANonExistentMethod: () => {
    console.log("I think therefore I am");
  }
} as { runANonExistentMethod: () => void} // How can we avoid the error for the code commented out below when we don't know the type?
// w.runANonExistentMethod(); // Error: Object is of type 'unknown'.
if(typeof w === 'object' && w !== null) {
  (w as { runANonExistentMethod: Function }).runANonExistentMethod();
} // Although we have to cast multiple times we can do a check in the if to secure our type and have a safer casting

  /* NEVER is rarely used, especially by itself, its primary use is in advanced generics. */

// let x: never = false; // Error: Type 'boolean' is not assignable to type 'never'.

/* 3) Arrays & Tuples */

  /* ARRAYS */
const nameList: string[] = [ "Jack", "Joe", "Max" ];
const salaryList: Array<number> = [ 1000, 1500, 2000 ]; // Alternative way to declare an array
const onVacation = [ true, false, false ]; // TS can infer the type of an array if it has values.

    /* Readonly prevents the array to be modified  */
const names: readonly string[] = ["Dylan"];
// names.push("Jack"); // Error: Property 'push' does not exist on type 'readonly string[]'.

  /*
    TUPLE is a typed array with a pre-defined length and types for each index.
    To define a tuple, specify the type of each element in the array:
  */
const employee: [ number, string ] = [ 1, "Steve" ]; // Even though we have a number and a string, the order matters in our tuple and will throw an error if we swap the data.

const person: readonly [ number, string, boolean ] = [ 1, "Steve", true ]; // A good practice is to make your tuple readonly. (In React useState returns a tuple of the value and a setter function.)

    /* Named tuples provide more context for what our index values represent. */
const graph: [ x: number, y: number ] = [ 55.2, 41.3 ];

    /* Since tuples are arrays we can also destructure them. */
const destGraph: [number, number] = [55.2, 41.3];
const [ x, xx ] = destGraph;

/* 4) Objects */

  /* OBJECT types can also be written separately, and even be reused, */
const car: { type: string, model: string, year: number } = {
  type: "Toyota",
  model: "Corolla",
  year: 2009
};

const carInterfer = {
  type: "Toyota",
};
carInterfer.type = "Ford"; // TS can infer the types of properties based on their values.
// carInterfer.type = 2; // Error: Type 'number' is not assignable to type 'string'.

  /* Optional Properties */
const carOpt: { type: string, mileage?: number } = { // // Without '?': Error: Property 'mileage' is missing in type '{ type: string; }' but required in type '{ type: string; mileage: number; }'.
  type: "Toyota"
};
carOpt.mileage = 2000;

  /* Index Signatures */
const nameAgeMap: { [index: string]: number } = {};
nameAgeMap.Jack = 25; // no error
// nameAgeMap.Mark = "Fifty"; // Error: Type 'string' is not assignable to type 'number'.

/* 5) Enums */

/* ENUM is a special "class" that represents a group of constants (unchangeable variables). */

    /* Numeric enums */
enum CardinalDirections {
  North,// 0
  East, // 1
  South, // 2
  West // 3
}

let currentDirection = CardinalDirections.North;
console.log(currentDirection); // logs 0
// throws error as 'North' is not a valid enum
// currentDirection = 'North'; // Error: "North" is not assignable to type 'CardinalDirections'.

enum InitializedCardinalDirections
{
  North = 3, // You can set the value of the first numeric enum and have it auto increment from that.
  East, // 4
  South, // 5
  West, // 6
}

enum FullyInitializedCardinalDirections
{
  North = 3, // You can assign unique number values for each enum value. Then the values will not incremented automatically.
  East = 4,
  South = 5,
  West = 6,
}

  /* Enums can also contain strings. This is more common than numeric enums, because of their readability and intent. */
enum StringCardinalDirections {
  North = 'North',
  East = 'East',
  South = 'South',
  West = 'West'
};

    /* Technically, you can mix and match string and numeric enum values, but it is recommended not to do so. */

/* 6) Aliases & Interfaces */

  /*
    Type Aliases allow defining types with a custom name (an ALIAS).
    Type Aliases can be used for primitives like string or more complex types such as objects and arrays
  */
type CarYear = number
type CarType = string
type CarModel = string
type Car = {
  year: CarYear,
  type: CarType,
  model: CarModel
}

const carYear: CarYear = 2001
const carType: CarType = "Toyota"
const carModel: CarModel = "Corolla"
const carr: Car = {
  year: carYear,
  type: carType,
  model: carModel
};

  /* INTERFACES are similar to type aliases, except they only apply to object types. */
const rectangle: {
  height: number,
  width: number
} = {
  height: 20,
  width: 10
};

    /* Extending an interface means you are creating a new interface with the same properties as the original, plus something new. */
interface Rectangle {
  height: number,
  width: number
}

interface ColoredRectangle extends Rectangle {
  color: string
}

const coloredRectangle: ColoredRectangle = {
  height: 20,
  width: 10,
  color: "red"
};

/* 7) Union types */

  /*
    Union types are used when a value can be more than a single type.
    Such as when an 'id' property would be string or number.
  */
function printStatusCode(code: string | number) { // `|` is the OR operator
  console.log(`My status code is ${code}.`)
}
printStatusCode(404);
printStatusCode( '404' );

  /*
    Note: you need to know what your type is when union types are being used to avoid type errors.
    In our example we are having an issue invoking toUpperCase() as its a string method and number doesn't have access to it.

function printStatusCode2(code: string | number) {
  console.log(`My status code is ${code.toUpperCase()}.`) // error: Property 'toUpperCase' does not exist ontype 'string | number'.
}
  */

/* 8) Functions */

  /* RETURN TYPE
    The type of the value returned by the function can be explicitly defined.
    If no return type is defined, TS will attempt to infer it through the types of the variables or expressions returned.
  */
function getTime(): number { // the `: number` here specifies that this function returns a number
  return new Date().getTime();
}

    /* The type VOID can be used to indicate a function doesn't return any value. */
function printHello(): void {
  console.log('Hello!');
}

  /*
    Function PARAMETERS are typed with a similar syntax as variable declarations.
    If no parameter type is defined, TS will default to using any, unless additional type information is available.
  */
function multiply(a: number, b: number) {
  return a * b;
}

  /* By default TS will assume all PARAMETERS are required, but they can be explicitly marked as OPTIONAL. */
function add(a: number, b: number, c?: number) { // the `?` operator here marks parameter `c` as optional
  return a + b + (c || 0);
}

  /*
    For PARAMETERS with DEFAULT values, the default value goes after the type annotation.
    TS can also infer the type from the default value.
  */
function pow(value: number, exponent: number = 10): number {
  return value ** exponent;
}

  /* Typing NAMED PARAMETERS follows the same pattern as typing normal parameters. */
function divide({ dividend, divisor }: { dividend: number, divisor: number }) {
  return dividend / divisor;
}

  /*
    REST PARAMETERS can be typed like normal parameters, but the type must be an array as rest parameters are always arrays.
  */
function add2(a: number, b: number, ...rest: number[]) {
  return a + b + rest.reduce((p, c) => p + c, 0);
}

  /*
    Function types can be specified separately from functions with type aliases.
    These types are written similarly to arrow functions.
  */
type Negate = (value: number) => number; // in this function, the parameter `value` automatically gets assigned the type `number` from the type `Negate`
const negateFunction: Negate = ( value ) => value * -1;

/* 9) Casting */

  /*
    Casting is the process of overriding a type.
    A straightforward way to cast a variable is using the as keyword, which will directly change the type of the given variable.
  */
let yy: unknown = 'hello';
console.log( ( yy as string ).length );

    /*
      Casting doesn't actually change the type of the data within the variable, for example the following code will not work as expected since the variable x is still holds a number.
    */
let zz: unknown = 4;
console.log( ( zz as string ).length ); // prints undefined since numbers don't have a length

    /* FORCE CASTING
       TS will still attempt to typecheck casts to prevent casts that don't seem correct, for example the following will throw a type error since TS knows casting a string to a number doesn't makes sense without converting the data:
    */
// console.log((4 as string).length); // Error: Conversion of type 'number' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

      /* To override type errors that TS may throw when casting, first cast to unknown, then to the target type. */
let tt = 'hello';
console.log( ( ( tt as unknown ) as number ).length ); // x is not actually a number so this will return undefined.

    /* Using <> works the same as casting with as, but this type of casting will not work with TSX, such as when working on React files.
let cc: unknown = 'hello';
console.log((<string>cc).length);
    */

/* 10) Classes */

  /*
  The members of a class (properties & methods) are typed using type annotations, similar to variables.
  There are three main visibility modifiers in TS.
    public - (default) allows access to the class member from anywhere
    private - only allows access to the class member from within the class
    protected - allows access to the class member from itself and any classes that inherit it, which is covered in the inheritance section below
  */

class Person {
  /*
    private name: string;
    public constructor(name: string) {
      this.name = name;
    }

    TS provides a convenient way to define class members in the constructor, by adding a visibility modifiers to the parameter:
  */

  public constructor ( private name: string, readonly age: number ) // name is a private member variable
  {
    this.name;

    /*
      Similar to arrays, the readonly keyword can prevent class members from being changed.
      age cannot be changed after this initial definition, which has to be either at it's declaration or in the constructor.
    */

    this.age;
  }

  public getName(): string {
    return this.name; // The this keyword in a class usually refers to the instance of the class.
  }
}

const person2 = new Person("Jane", 12);
console.log( person2.getName() ); // person2.name isn't accessible from outside the class since it's private.

  /* INHERITANCE
    Interfaces can be used to define the type a class must follow through the IMPLEMENTS keyword.
    Classes can extend each other through the EXTENDS keyword. A class can only extends one other class.
  */

interface Shape {
  getArea: () => number;
}

class Rectangle implements Shape {
  public constructor(protected readonly width: number, protected readonly height: number) {} // A class can implement multiple interfaces by listing each one after implements, separated by a comma like so: class Rectangle implements Shape, Colored {

  public getArea(): number {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  public constructor(width: number) {
    super(width, width);
  }

  // getArea gets inherited from Rectangle
}

  /*
    When a class extends another class, it can replace the members of the parent class with the same name.
    Newer versions of TS allow explicitly marking this with the override keyword.
    By default the override keyword is optional when overriding a method, and only helps to prevent accidentally overriding a method that does not exist.
    Use the setting noImplicitOverride to force it to be used when overriding.
  */

interface Shape2 {
  getArea: () => number;
}

class Rectangle2 implements Shape2 {
  // using protected for these members allows access from classes that extend from this class, such as Square2
  public constructor(protected readonly width: number, protected readonly height: number) {}

  public getArea(): number {
    return this.width * this.height;
  }

  public toString(): string {
    return `Rectangle[width=${this.width}, height=${this.height}]`;
  }
}

class Square2 extends Rectangle2 {
  public constructor(width: number) {
    super(width, width);
  }

  // this toString replaces the toString from Rectangle2
  public override toString(): string {
    return `Square2[width=${this.width}]`;
  }
}

    /*
      Classes can be written in a way that allows them to be used as a base class for other classes without having to implement all the members. This is done by using the ABSTRACT keyword. Members that are left unimplemented also use the ABSTRACT keyword.
      Abstract classes cannot be directly instantiated, as they do not have all their members implemented.
    */
abstract class Polygon {
  public abstract getArea(): number;

  public toString(): string {
    return `Polygon[area=${this.getArea()}]`;
  }
}

class Rect2 extends Polygon {
  public constructor(protected readonly width: number, protected readonly height: number) {
    super();
  }

  public getArea(): number {
    return this.width * this.height;
  }
}

/* 11) Generics */

  /*
    GENERICS makes it easier to write reusable code.
    Generics allow creating 'type variables' which can be used to create classes, functions & type aliases that don't need to explicitly define the types that they use.
    TS can also infer the type of the generic parameter from the function parameters.
  */

function createPair<S, T>(v1: S, v2: T): [S, T] {
  return [v1, v2];
}
console.log( createPair<string, number>( 'hello', 42 ) ); // ['hello', 42]

    /*
      Generics can be used to create generalized CLASSES, like Map.
      TS can also infer the type of the generic parameter if it's used in a constructor parameter.
    */
class NamedValue<T> {
  private _value: T | undefined;

  constructor(private name: string) {}

  public setValue(value: T) {
    this._value = value;
  }

  public getValue(): T | undefined {
    return this._value;
  }

  public toString(): string {
    return `${this.name}: ${this._value}`;
  }
}

let value = new NamedValue<number>('myNumber');
value.setValue(10);
console.log( value.toString() ); // myNumber: 10

    /*
      Generics in TYPE ALIASES allow creating types that are more reusable.
      This also works with interfaces with the following syntax: interface Wrapped<T> {
    */
type Wrapped<T> = { value: T; };

const wrappedValue: Wrapped<number> = { value: 10 };

/* Generics can be assigned default values which apply if no other value is specified or inferred. */

class NamedValue2<T = string> {
  private _value: T | undefined;

  constructor(private name: string) {}

  public setValue(value: T) {
    this._value = value;
  }

  public getValue(): T | undefined {
    return this._value;
  }

  public toString(): string {
    return `${this.name}: ${this._value}`;
  }
}

let value2 = new NamedValue2('myNumber');
value2.setValue('myValue');
console.log( value2.toString() ); // myNumber: myValue

    /* EXTENDS
      Constraints can be added to generics to limit what's allowed. The constraints make it possible to rely on a more specific type when using the generic type.
      This can be combined with a default value.
    */

function createLoggedPair<S extends string | number, T extends string | number>(v1: S, v2: T): [S, T] {
  console.log(`creating pair: v1='${v1}', v2='${v2}'`);
  return [v1, v2];
}

/* 12) Utility Types */

  /* PARTIAL changes all the properties in an object to be optional. */
interface Point {
  x: number;
  y: number;
}

let pointPart: Partial<Point> = {}; // `Partial` allows x and y to be optional
pointPart.x = 10;

  /* REQUIRED changes all the properties in an object to be required. */
interface Car {
  make: string;
  model: string;
  mileage?: number;
}

let myCar: Required<Car> = {
  make: 'Ford',
  model: 'Focus',
  mileage: 12000 // `Required` forces mileage to be defined
};

  /*
    RECORD is a shortcut to defining an object type with a specific key type and value type.
    Record<string, number> is equivalent to { [key: string]: number }
  */
const nameAgeMap: Record<string, number> = {
  'Alice': 21,
  'Bob': 25
};

  /* OMIT removes keys from an object type. */
interface Person {
  name: string;
  age: number;
  location?: string;
}

const bob: Omit<Person, 'age' | 'location'> = {
  name: 'Bob' // `Omit` has removed age and location from the type and they can't be defined here
};

  /* PICK removes all but the specified keys from an object type. */
interface Person {
  name: string;
  age: number;
  location?: string;
}

const bob: Pick<Person, 'name'> = {
  name: 'Bob'
  // `Pick` has only kept name, so age and location were removed from the type and they can't be defined here
};

  /* EXCLUDE removes types from a union. */
type Primitive = string | number | boolean
const value: Exclude<Primitive, string> = true; // a string cannot be used here since Exclude removed it from the type.

  /* RETURNTYPE extracts the return type of a function type. */
type PointGenerator = () => { x: number; y: number; };
const point: ReturnType<PointGenerator> = {
  x: 10,
  y: 20
};

  /* PARAMETERS extracts the parameter types of a function type as an array. */
type PointPrinter = (p: { x: number; y: number; }) => void;
const point: Parameters<PointPrinter>[0] = {
  x: 10,
  y: 20
};

  /*
    READONLY is used to create a new type where all properties are readonly, meaning they cannot be modified once assigned a value.
    Keep in mind TS will prevent this at compile time, but in theory since it is compiled down to JS you can still override a readonly property.
  */
interface Person {
  name: string;
  age: number;
}
const person: Readonly<Person> = {
  name: "Dylan",
  age: 35,
};
person.name = 'Israel'; // prog.ts(11,8): error TS2540: Cannot assign to 'name' because it is a read-only property.

/* 13) Keyof */

  /*
    KEYOF is a keyword in TS which is used to extract the key type from an object type.
    When used on an object type with explicit keys, keyof creates a union type with those keys.
  */
interface Person {
  name: string;
  age: number;
}

function printPersonProperty(person: Person, property: keyof Person) { // `keyof Person` here creates a union type of "name" and "age", other strings will not be allowed

  console.log(`Printing person property ${property}: "${person[property]}"`);
}
let person = {
  name: "Max",
  age: 27
};
printPersonProperty( person, "name" ); // Printing person property name: "Max"

  /* keyof can also be used with index signatures to extract the index type. */
type StringMap = { [key: string]: unknown };
// `keyof StringMap` resolves to `string` here
function createStringPair(property: keyof StringMap, value: string): StringMap {
  return { [property]: value };
}

/* 14) Undefined & Null */

  /* strictNullChecks (tsconfig.json) is enabled.
    null and undefined are primitive types and can be used like other types, such as string.
    When strictNullChecks is enabled, TS requires values to be set unless undefined is explicitly added to the type.
  */
let value: string | undefined | null = null;
value = 'hello';
value = undefined;

  /*
    Optional Chaining is a JS feature that works well with TS's null handling. It allows accessing properties on an object, that may or may not exist, with a compact syntax. It can be used with the ?. operator when accessing properties.
  */
interface House {
  sqft: number;
  yard?: {
    sqft: number;
  };
}

function printYardSize(house: House) {
  const yardSize = house.yard?.sqft;
  if (yardSize === undefined) {
    console.log('No yard');
  } else {
    console.log(`Yard is ${yardSize} sqft`);
  }
}

let home: House = {
  sqft: 500
};

printYardSize( home ); // Prints 'No yard'

  /*
    Nullish Coalescence is another JS feature that also works well with TS's null handling. It allows writing expressions that have a fallback specifically when dealing with null or undefined. This is useful when other falsy values can occur in the expression but are still valid. It can be used with the ?? operator in an expression, similar to using the && operator.
  */
function printMileage(mileage: number | null | undefined) {
  console.log(`Mileage: ${mileage ?? 'Not Available'}`);
}

printMileage(null); // Prints 'Mileage: Not Available'
printMileage( 0 ); // Prints 'Mileage: 0'

  /*
    TS's inference system isn't perfect, there are times when it makes sense to ignore a value's possibility of being null or undefined. An easy way to do this is to use casting, but TS also provides the ! operator as a convenient shortcut.
    Just like casting, this can be unsafe and should be used with care.
  */
function getValue(): string | undefined {
  return 'hello';
}
let value = getValue();
console.log( 'value length: ' + value!.length );

  /* Array bounds handling
    Even with strictNullChecks enabled, by default TS will assume array access will never return undefined (unless undefined is part of the array type).
    The config noUncheckedIndexedAccess can be used to change this behavior.
  */
let array: number[] = [1, 2, 3];
let value = array[ 0 ]; // with `noUncheckedIndexedAccess` this has the type `number | undefined`

/* 15) Template Literal Types */

  /*
    Template Literal Types now allows us to create more precise types using template literals. We can define custom types that depend on the actual values of strings at compile time.
  */
type Color = "red" | "green" | "blue";
type HexColor<T extends Color> = `#${string}`;

// Usage:
let myColor: HexColor<"blue"> = "#0000FF";

/* 16) Index Signature Labels */

  /*
    Index Signature Labels allows us to label index signatures using computed property names. It helps in providing more descriptive type information when working with dynamic objects.
  */
type DynamicObject = { [key: string as `dynamic_${string}`]: string };

// Usage:
let obj: DynamicObject = { dynamic_key: "value" };
