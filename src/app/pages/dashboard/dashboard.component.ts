import { Component, HostListener, OnInit } from "@angular/core";
import { HttpService } from "src/app/core/services/http.service";
import { MusicService } from "src/app/core/services/music.service";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { AlbumComponent } from "../../overlays/album/album.component";
import { ArtistComponent } from "../../overlays/artist/artist.component";
import * as moment from "moment";
import { ThemeService } from "src/app/core/services/theme.service";
import { SearchComponent } from "../../overlays/search/search.component";
import { UploadComponent } from "src/app/overlays/upload/upload.component";
import { AuthService } from "src/app/core/services/auth.service";
import { PlayerService } from "src/app/core/services/player.service";
declare const Chart;
declare const ApexCharts;
@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
	public data: any = { data: {} };
	public albums = [];



	public maxDate = new Date();

	public loading = true;

	public charts: {
		streams?: any,
		albums?: any,
		tracks?: any,
	} = {};
	constructor(private httpService: HttpService, private authService: AuthService, public theme: ThemeService, public playerService: PlayerService, private modalService: ModalService) { }

	ngOnInit(): void {

	}

	public onUpload() {
		this.modalService.show({
			component: UploadComponent,
		});
	}

	public onSearch() {
		this.modalService.show({
			component: SearchComponent,
		});
	}

	public onAlbum(id: string) {
		this.modalService.show({
			component: AlbumComponent,
			class: "fullscreen",
			params: {
				id,
			}
		});
	}

	public onArtist(id: string) {
		this.modalService.show({
			component: ArtistComponent,
			class: "fullscreen",
			params: {
				id
			},
		});
	}

	public onLogout() {
		this.authService.clear();
		location.reload();
	}

	ngAfterViewInit() {
		this.getInsights();

	}


	public buildTracksChart() {
		const ctx = document.getElementById("tracks");
		const data = {
			labels: this.data.tracks.map((track) => track.track.name),
			datasets: [{
				data: this.data.tracks.map((track) => track.playcount),
				backgroundColor: "#3ec7c2",
				borderColor: "#3ec7c2",
				// borderRadius: 20,
			}]
		};
		if (this.charts.tracks) {
			this.charts.tracks.data = data;
			this.charts.tracks.update();
			return;
		}
		this.charts.tracks = this._chartRenderer(ctx, "bar", data);
	}

	public buildAlbumsChart() {
		const ctx = document.getElementById("albums");
		const data = {
			labels: this.data.albums.map((album) => album.album.name),
			datasets: [{
				data: this.data.albums.map((album) => album.playcount),
				backgroundColor: "#3ec7c2",
				borderColor: "#3ec7c2",
				// borderRadius: 20,
			}]
		};
		if (this.charts.albums) {
			this.charts.albums.data = data;
			this.charts.albums.update();
			return;
		}
		this.charts.albums = this._chartRenderer(ctx, "bar", data);

	}
	public buildStreamsChart() {

		const labels = this.data.plays.labels.map((l) => moment(l).format("MMM DD"));
		const data = {
			labels,
			datasets: [{
				label: "Streams",
				backgroundColor: "#3ec7c2",
				borderColor: "#3ec7c2",
				// borderRadius: 20,
				data: this.data.plays.values
			}]
		};
		if (this.charts.streams) {
			this.charts.streams.data = data;
			this.charts.streams.update();
			return;
		}
		const config = {
			type: "line",
			data,
			options: {
				layout: {
					autoPadding: false,
				},

				responsive: true,
				maintainAspectRatio: true,
				elements: {
					point: {
						radius: 6,
						hitRadius: 6,
						hoverRadius: 6,
						fill: true
					},



				},

				scales: {
					xAxis: {
						// display: false,
						grid: {
							display: false,
						},
						ticks: {
							autoSkip: true,
							maxTicksLimit: 7
						},
					},
					yAxis: {
						display: false,
						ticks: {
							beginAtZero: true,
						},
					}
				},
				plugins: {
					legend: {
						display: false,
					},
					tooltip: {
						backgroundColor: "#131517",
						displayColors: false,
						bodyColor: "#fff",
						titleColor: "#fff",
						intersect: false,
						padding: 10,
						bodyFont: {
							size: 16,
						},
						titleFont: {
							size: 12,
						},
						callbacks: {
							label: (tooltipItems) => {
								return (tooltipItems.formattedValue) + " Streams";
							}
						}
					}

				},

			}
		};

		this.charts.streams = new Chart(
			document.getElementById("streams"),
			config
		);
	}

	private getInsights() {
		this.httpService.get(`/insights`).subscribe({
			next: (data: any) => {
				this.data = data;
				this.buildStreamsChart();
				this.buildAlbumsChart();
				this.buildTracksChart();
			}
		});
	}

	private _chartRenderer(ctx: any, type: string, data: any) {
		return new Chart(ctx, {
			type,
			data,
			options: {
				layout: {
					autoPadding: false,
				},
				responsive: true,
				maintainAspectRatio: true,
				elements: {
					point: {
						radius: 6,
						hitRadius: 6,
						hoverRadius: 6,
						fill: true
					},

				},
				scales: {
					y: {
						beginAtZero: true
					},
					xAxis: {
						display: false,
						grid: {
							display: false,
						},
						ticks: {
							autoSkip: true,
							maxTicksLimit: 7
						},
					},
					yAxis: {
						display: false,
						ticks: {
							beginAtZero: true,
						},
					}
				},

				plugins: {
					legend: {
						display: false,
					},
					tooltip: {
						backgroundColor: "#131517",
						displayColors: false,
						bodyColor: "#fff",
						titleColor: "#fff",
						intersect: false,
						padding: 10,
						bodyFont: {
							size: 16,
						},
						titleFont: {
							size: 12,
						},
						callbacks: {
							label: (tooltipItems) => {
								return (tooltipItems.formattedValue) + " Streams";
							}
						}
					}

				},
			}
		});
	}
}
