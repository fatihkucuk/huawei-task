import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PageMode } from '../../enums/page-mode-enum';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss']
})
export class LeftSideBarComponent implements OnInit {
  pageMode: PageMode = PageMode.None;
  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.url == '/dashboard/list') {
      this.pageMode = PageMode.List;
    } else {
      this.pageMode = PageMode.None;
    }
  }

  itemClicked(item: string) {
    switch (item) {
      case 'task':
        this.pageMode = PageMode.List;
        this.router.navigateByUrl('dashboard/list')
        break;
      default:
        break;
    }
  }
}
