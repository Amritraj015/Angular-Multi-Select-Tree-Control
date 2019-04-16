import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchFilter"
})
export class SearchFilterPipe implements PipeTransform {
  transform(treeNodeName: string, search: string): any {
    if (!search) return treeNodeName;

    let pattern = search
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
      .split(" ")
      .filter(splitTerm => {
        return splitTerm.length > 1;
      })
      .join("|");

    let regExp = new RegExp(pattern, "gi");

    return treeNodeName.replace(
      regExp,
      matchedString => `<span class="bg-warning">${matchedString}</span>`
    );
  }
}
