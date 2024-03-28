import { Component } from '@angular/core';
import { CatalogoService } from './catalogo.service';
import { Catalogo } from './catalogo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'front';
  catalogos!: any;
  filtro!: any;
  paginaAtual: number = 1;
  categoriaAtiva: string = 'Tudo';

  constructor(private catalogoService: CatalogoService) {
  }

  ngOnInit() {
    this.catalogoService.lerCatalogos().subscribe((c: Catalogo[]) => {
      // Embaralha os catálogos antes de atribuí-los
      c = this.embaralharArray(c);
      this.catalogos = c;
      this.filtro = c;
    });
  }

  // Método para embaralhar um array
  embaralharArray(array: any[]): any[] {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // Enquanto ainda houver elementos para embaralhar
    while (currentIndex !== 0) {
      // Escolhe um elemento restante
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // E troca ele com o elemento atual
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // Lógica para avançar para a próxima página
  proximaPagina() {
    const totalPages = Math.ceil(this.catalogos.length / 20);
    if (this.paginaAtual < totalPages) {
      this.paginaAtual++;
    }
  }

  // Lógica para voltar para a página anterior
  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
    }
  }

  filtrar(t: any) {
    if (t !== 'Tudo') {
      this.categoriaAtiva = t;
      this.filtro = this.catalogos.filter((c: any) => c.tipo == t);
      this.paginaAtual = 1; 
    } else {
      this.categoriaAtiva = 'Tudo';
      this.filtro = this.catalogos;
      this.paginaAtual = 1; // Reinicia a página para 1 ao aplicar o filtro "Tudo"
    }
  }

  // Método para verificar se o botão de página anterior deve ser desabilitado
  botaoPaginaAnteriorDesabilitado(): boolean {
    return this.paginaAtual === 1;
  }

  // Método para verificar se o botão de próxima página deve ser desabilitado
  botaoProximaPaginaDesabilitado(): boolean {
    const totalPages = Math.ceil(this.filtro.length / 20);
    return this.paginaAtual === totalPages || this.filtro.length <= 20;
  }
}
