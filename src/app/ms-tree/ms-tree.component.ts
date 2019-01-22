import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ms-tree',
  templateUrl: './ms-tree.component.html',
  styleUrls: ['./ms-tree.component.less']
})
export class MSTreeComponent implements OnInit {

  public tree: any[] = [{
    'name' : 'Amrit'
  },{
    'name' : 'Raj'
  },{
    'name' : 'Talent'
  },{
    'name' : 'Quest'
  }];

  ngOnInit() {
  }

}
