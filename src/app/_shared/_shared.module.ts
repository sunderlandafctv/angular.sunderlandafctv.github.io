import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SearchFormComponent } from './searchform/searchform.component';

@NgModule({
 imports: [ CommonModule, FormsModule ],
 declarations: [ 
    SearchFormComponent
],
 exports: [ 
    SearchFormComponent,
    CommonModule, 
    FormsModule 
]
})
export class SharedModule { }