import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchFilter"
})
export class SearchFilterPipe implements PipeTransform {
  transform(treeNode: string, search: string): any {
    if (!search) return treeNode;
    let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    pattern = pattern
      .split(" ")
      .filter(t => {
        return t.length > 0;
      })
      .join("|");
    let regex = new RegExp(pattern, "gi");
    let highlight = treeNode.replace(
      regex,
      match => `<span class="bg-warning">${match}</span>`
    );
    return search ? highlight : treeNode;
  }
}
