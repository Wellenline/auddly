import { Component, OnInit } from '@angular/core';
import { InterfaceService } from 'src/app/modules/shared/services/interface.service';
import { HttpService } from 'src/app/services/http.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
	selector: 'app-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
	public files = [];
	public queue = [];
	constructor(private uploadService: UploadService, private interfaceService: InterfaceService) { }

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
				this.interfaceService.notify("No new files found for upload");

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
				this.interfaceService.notify("Done uploading!");
			}).catch((err) => {
				console.log("Failed to upload", err);
			});
		});

	}

	ngAfterViewInit() {


	}
}

/*const response = await Http.instance.post(`/sync`, {
				separator: path.sep,
				root: this._dirs,
				files,
			});

			if (response.length === 0) {
				return;
			}

			if (this._isSyncing) {
				console.log("Sync already in progress, push new ", response.length, "items to the queue");
				this._queue.push(...response);
				return;
			}

			this._isSyncing = true;

			this._queue = response;

			let index = 0;

			const sleep = (time: number) => {
				return new Promise((resolve) => setTimeout(resolve, time));
			};

			for (const file of this._queue) {

				index++;

				const formData = new FormData();

				const parts: string[] = file.split(path.sep);
				const name = parts[parts.length - 1];

				let filePath = file;

				const rootPaths = this._dirs;
				for (const root of rootPaths) {
					filePath = filePath.replace(root, "");
				}

				const cleanedPath = filePath.replace(/\\/g, "/");
				const filePathDir = cleanedPath.split("/");

				filePathDir.pop();
				filePathDir.shift();

				const dir = filePathDir.join("/");

				formData.append("data", createReadStream(file));
				formData.append("name", name);
				formData.append("file", filePath);
				formData.append("dir", dir);
				formData.append("separator", path.sep);
				formData.append("root", JSON.stringify(this._dirs));

				await Http.instance.upload(`/sync/upload`, formData).catch((err) => console.log("Failed to upload", err));

				console.log(`Syncing file ${index}/${this._queue.length}`);
				App.instance._actions.sync.setText(`⟳ Syncing file ${index}/${this._queue.length}`);

				await sleep(1000);

			}
*/