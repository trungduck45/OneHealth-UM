import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DreportSharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    DreportSharedModule,
    RouterModule.forChild([
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class DreportEntityModule {}
