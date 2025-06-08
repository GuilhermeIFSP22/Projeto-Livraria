export class Curso {

    private static ultimoID : number = 0;

    id : number;
    nome : string;
    static listaCursos: Curso[] = [];

    constructor(nome:string){

        this.nome = nome;
        this.id = ++Curso.ultimoID;
    }

    static inicializarCursos() {
        Curso.ultimoID = 0;
        Curso.listaCursos = [
          new Curso("ADS"),
          new Curso("Pedagogia"),
          new Curso("Administração"),
        ];
    }

    
  static buscarNomePorID(id: number): string {
    const curso = Curso.listaCursos.find(c => c.id === id);
    return curso ? curso.nome : "Curso não encontrado";
  }
}