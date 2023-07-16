export class FieldDescription{
   [string: string]: string;
   display_name: string;
   description: string;
   constructor(key: string, value: string, display_name: string, description: string){
      this.key = key;
      this.value = value;
      this.display_name = display_name;
      this.description = description;
   }
}

export class Field{
   [string: string]: string;
}