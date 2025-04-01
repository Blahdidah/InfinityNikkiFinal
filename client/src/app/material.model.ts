export class Material {
    constructor(
        public name: string,
        public sourceType: string,
        public sources: string[],
        public rarity: number
    ) { }
}