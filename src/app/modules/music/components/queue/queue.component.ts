import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ITrack, PlayerService } from 'src/app/core/services/player.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
	selector: 'app-queue',
	templateUrl: './queue.component.html',
	styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
	private destroy = new Subject();
	public duration = 0;
	public tracks: ITrack[] = [];
	constructor(public playerService: PlayerService, public modal: ModalComponent) { }

	ngOnInit(): void {
		this.playerService.$queue.pipe(takeUntil(this.destroy)).subscribe((tracks) => {
			this.tracks = tracks;

			this.duration = 0;
			this.tracks.map((track) => {
				if (track.duration) {
					this.duration += track.duration;
				}
			});
		});
	}

	public onClear() {
		this.playerService.clear();
	}


	public drop(event: any) {
		moveItemInArray(this.tracks, event.previousIndex, event.currentIndex);
		console.log("drop", event);
		this.playerService.$queue.next(this.tracks);
		/*this.httpService.put(`/articles/${this.articles.data[event.currentIndex].category._id}/order`, {
			articles: this.articles.data.map((article, index) => {
				return {
					_id: article._id,
					index,
				}
			}),
		}).subscribe((response) => {
			// this.onArticles
		});*/
	}

}
