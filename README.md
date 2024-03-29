# Multi-Select Tree Control

## Inputs for the control

The control main component `<ms-tree-control>` takes 2 inputs:

1.  `flatTreeNodes: ITreenode[]`: An array of flat tree nodes as input data, where `ITreeNode` is an `interface` that defines a tree node, it has the following properties:

- `nodeName: string` => Name of the tree node
- `nodeID: string` => Unique ID for a tree node
- `nodeParentID: string` => Parent node ID of a tree node (multiple tree node may have the same `nodeParentID`)
- `nodeAuthorized: boolean` => Represnets if a node is Authorized (`true` if authorized else `false`)
- `nodeInactive: boolean` => Represents if a node is inactive (`true` if a node is inactive else `false`)

2.  `disableSearch: boolean`: A boolean value to disable the search feature (`true` if search needs to be disabled else `false`, the value is `false` by default)

---

## Outputs from the control

1.  The control's main component `<ms-tree-control>` raises an event `nodeSelectionEvent` whenever a node is selectde or unselected. The emitted event object is of type `NodeSelectionData`, which contains the following properties:

- `allSelectedNodes: Set<TreeNode>` => A set of all the nodes that are selected
- `totalSelectedCount: number` => Total number of selected nodes
- `inactiveSelectedNodes: Set<TreeNode>` => A set of all selected inactive nodes
- `inactiveSelectedCount: number` => Total number of inactive selected nodes

---

## Example Usage

`<ms-tree-control [flatTreeNodes]="allFlatTreeNodes" [disableSearch]="false" (nodeSelectionEvent)="functionToHandleEvent($event)"> </ms-tree-control>`

where:

- `allFlatTreeNodes` is of type `ITreeNode` as defined above.
- `functionToHandleEvent($event)` handles the node select/unselect event

---

## Important Notes

- Nodes with no parents (root nodes) must have `nodeID: string = "NULL"` for expected behaviour. Although this can be tweeked as per needs in the `GetTreeService`.
- The search field must have atleast 2 characters for the node search to execute.
- There is a `500 ms` time delay after characters have been entered in the search field and before the search algorithm executes. This time delay can be changed/removed as per needs in the `findMatchingTreeNodes(searchTerm: string)` method of the `MSTreeComponent` component `class`.

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
