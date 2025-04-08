export class Material {
    constructor(
        public name: string,
        public type: string,
        public source: string[],
        public rarity: number,
        public image_url: string
    ) { }
}