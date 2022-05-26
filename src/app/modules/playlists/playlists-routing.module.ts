import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { PlaylistsComponent } from './playlists.component';

const routes: Routes = [{
	path: '', component: PlaylistsComponent, children: [{
		path: '',
		component: IndexComponent,
	}]
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PlaylistsRoutingModule { }
