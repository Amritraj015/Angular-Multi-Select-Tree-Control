import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchFilter"
})
export class SearchFilterPipe implements PipeTransform {
  transform(treeNode: string, search: string): any {
    if (!search) return treeNode;

    let pattern = search
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
      .split(" ")
      .filter(splitTerm => {
        return splitTerm.length > 1;
      })
      .join("|");

    let regExp = new RegExp(pattern, "gi");

    return treeNode.replace(
      regExp,
      matchedString => `<span class="bg-warning">${matchedString}</span>`
    );
  }
}
