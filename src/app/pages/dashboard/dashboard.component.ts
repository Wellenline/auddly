import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/core/services/http.service";
import { MusicService } from "src/app/core/services/music.service";
import { ModalService } from "src/app/shared/components/modal/modal.service";
import { AlbumComponent } from "../../overlays/album/album.component";
import { ArtistComponent } from "../../overlays/artist/artist.component";
import * as moment from "moment";
import { ThemeService } from "src/app/core/services/theme.service";
declare const Chart;
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
		plays?: any,
	} = {};
	constructor(private httpService: HttpService, private musicService: MusicService, public theme: ThemeService, private modalService: ModalService) { }

	ngOnInit(): void {

		this.getRecentAlbums();
	}

	getInsights() {
		this.httpService.get(`/insights`).subscribe({
			next: (data: any) => {
				this.data = data;
				this.buildOrdersChart();
			}

		});
	}

	getRecentAlbums() {
		this.musicService.getAlbums({ sort: "-created_at", limit: 5 }).subscribe({
			next: (response: any) => {
				this.albums = response.data;
			}
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
			// class: "fullscreen",
			params: {
				id
			},
		});
	}

	ngAfterViewInit() {
		this.getInsights();
		const ctx = document.getElementById("myChart");
		const myChart = new Chart(ctx, {
			type: "bar",
			data: {
				labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
				datasets: [{
					label: "# of Votes",
					data: [12, 19, 3, 5, 2, 3],
					backgroundColor: [
						"rgba(255, 99, 132, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(255, 159, 64, 0.2)"
					],
					borderColor: [
						"rgba(255, 99, 132, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(255, 159, 64, 1)"
					],
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	}
	public buildOrdersChart() {

		const labels = this.data.plays.labels.map((l) => moment(l).format("MMM DD"));
		const data = {
			labels,
			datasets: [{
				label: "Streams",
				backgroundColor: "#252424",
				borderColor: "#666", borderRadius: 20,
				data: this.data.plays.values
			}]
		};
		if (this.charts.plays) {
			this.charts.plays.data = data;
			this.charts.plays.update();

			return;
		}
		const config = {
			type: "bar",
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
							label: (tooltipItems, data) => {
								console.log(tooltipItems);
								return (tooltipItems.formattedValue) + " Streams";
							}
						}
					}

				},

			}
		};

		this.charts.plays = new Chart(
			document.getElementById("plays"),
			config
		);
	}
}
