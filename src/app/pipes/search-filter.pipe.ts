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

    return search ? treeNode.replace(regex, match => match) : treeNode;
  }
}
