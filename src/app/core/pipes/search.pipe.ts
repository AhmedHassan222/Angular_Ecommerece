import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../Interfaces/IProduct';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: IProduct[], searchWord:string): IProduct[] {
    if(searchWord === '')
      return products;
    return products.filter(p => p.title.toLowerCase().includes(searchWord.toLowerCase()))

  }

}
