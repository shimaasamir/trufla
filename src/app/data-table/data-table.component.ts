import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { DataTableService } from './data-table-service.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<DataTableItem>;
  // dataSource: DataTableDataSource;

  MyDataSource: any;
  displayedColumns = ['id', 'title', 'body'];

  // /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  // displayedColumns = ['id', 'name'];
  constructor(public dataService: DataTableService) { }

  RenderDataTable() {
    this.dataService.GetAllRecords()
      .subscribe(
        res => {
          this.MyDataSource = new MatTableDataSource();
          this.MyDataSource.data = res;
          this.MyDataSource.paginator = this.paginator;
          this.MyDataSource.sort = this.sort;
          this.table.dataSource = this.MyDataSource.data;


          console.log(this.MyDataSource.data);
        },
        error => {
          console.log('There was an error while retrieving Photos !!!' + error);
        });
  }

  ngOnInit() {
    this.RenderDataTable();
  }
  ngAfterViewInit() {
    // this.MyDataSource.sort = this.sort;
    // this.MyDataSource.paginator = this.paginator;
    // this.table.dataSource = this.MyDataSource;
    // console.log(this.MyDataSource)
  }
}
