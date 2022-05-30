import { Component, OnInit } from "@angular/core";
import { UploadService } from "src/app/core/services/upload.service";
import { ModalComponent } from "src/app/shared/components/modal/modal.component";
import { ToastService } from "src/app/shared/components/toast/toast.service";

@Component({
	selector: "app-upload",
	templateUrl: "./upload.component.html",
	styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements OnInit {

	public files = [];
	public queue = [];
	constructor(private uploadService: UploadService, private toastService: ToastService) { }

	ngOnInit(): void {
		this.uploadService.$queue.subscribe((queue) => {
			this.queue = queue;
		});

		/*this.queue = [
			{
				done: true,
				lastModified: 1620319916915,
				name: "02 - She Moves (Far Away) (Out Of Space Mix).mp3",
				progress: 65,
				size: 16367819,
				type: "audio/mpeg",
				webkitRelativePath: "Out Of Space/02 - She Moves (Far Away) (Out Of Space Mix).mp3",
			},
			{
				done: false,
				lastModified: 1620319923504,
				name: "12 - Patina Green.mp3",
				size: 13395540,
				type: "audio/mpeg",
				progress: 0,
				webkitRelativePath: "Out Of Space/12 - Patina Green.mp3",
			}]
*/
	}

	public handleFiles(files: Iterable<File> | ArrayLike<File>) {
		this.files = [];
		this.files = Array.from(files).filter((file: any) => this.uploadService.ext.some((suffix) => file.webkitRelativePath.endsWith(suffix)
			|| file.name.endsWith(suffix)));

		const root = [];
		this.files.map((file) => {
			const parts = file.webkitRelativePath ? file.webkitRelativePath.split("/") : file.name.split("/");
			if (parts.length > 0) {
				parts.pop();
			}
			if (!root.includes(parts.join("/"))) {
				root.push(parts.join("/"));
			}

		});

		this.uploadService.consider({
			separator: "/",
			root,
			files: this.files.map((file) => file.webkitRelativePath || file.name),
		}).subscribe((response: string[]) => {
			console.log(response);

			if (response.length === 0) {
				// this.interfaceService.notify("No new files found for upload");

				return;
			}
			this.files = this.files.filter((file) => {
				return response.indexOf(file.webkitRelativePath || file.name) > -1;
			});

			console.log(this.files);
			if (this.uploadService.$uploading.getValue()) {
				console.log("Sync already in progress, push new ", response.length, "items to the queue");
				this.uploadService.$queue.next([...this.uploadService.$queue.getValue(), ...this.files]);
				return;
			}
			console.log(this.files);

			this.uploadService.$queue.next(this.files);

			this.uploadService.upload().then(() => {
				console.log("Done uploading");
				this.toastService.show({
					message: "Done uploading"
				});

			}).catch((err) => {
				console.log("Failed to upload", err);
			});
		});

	}

	ngAfterViewInit() {


	}
}
