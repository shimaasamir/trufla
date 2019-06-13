import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource, MatSortable } from '@angular/material';
import { DataTableService } from './data-table-service.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  sorting: MatSortable;
  MyDataSource: any;
  displayedColumns = ['id', 'title', 'url'];


  constructor(public dataService: DataTableService) { }

  RenderDataTable() {
    this.dataService.GetAllRecords()
      .subscribe(
        res => {
          this.MyDataSource = new MatTableDataSource();
          this.MyDataSource.data = res;
          this.setData(this.MyDataSource.data);



          console.log(this.MyDataSource.data);
        },
        error => {
          console.log('There was an error while retrieving Photos !!!' + error);
        });
  }

  ngOnInit() {
    this.RenderDataTable();

  }
  ngOnChanges() {
    this.setData(this.MyDataSource.data);
  }
  ngAfterViewInit() {

  }
  setData(data) {
    if (Array.isArray(data)) {
      this.MyDataSource = new MatTableDataSource(data);
      this.MyDataSource.paginator = this.paginator;
      this.MyDataSource.sort = this.sort;
    }
  }
  applyFilter(filterValue: string) {
    this.MyDataSource.filter = filterValue.trim().toLowerCase();

    if (this.MyDataSource.paginator) {
      this.MyDataSource.paginator.firstPage();
    }
  }
}
