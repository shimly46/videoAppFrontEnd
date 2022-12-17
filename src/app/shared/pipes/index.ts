
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { NgPipesModule } from 'ngx-pipes';
import { DateAgoPipe} from './date-ago.pipe';



/** Custom Pipes Registration */
const PIPES = [

  DateAgoPipe
];
  
const PIPES_MODULES = [NgPipesModule, NgxMaskModule.forRoot(), CommonModule];

@NgModule({
  declarations: PIPES,
  imports: PIPES_MODULES,
  exports: [...PIPES, PIPES_MODULES]
})
export class PipesModule {}
