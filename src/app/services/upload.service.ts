import { HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpService } from "./http.service";

@Injectable({
	providedIn: "root"
})
export class UploadService {
	public $queue = new BehaviorSubject([]);
	public $uploading = new BehaviorSubject(false);

	public ext: string[] = [".mp3", ".flac", ".m4a"];
	public separator = "/";
	public root = [];
	constructor(private httpService: HttpService) { }

	public consider(payload: { separator: string, files: any[], root: any[] }) {
		this.separator = payload.separator;
		this.root = payload.root;
		return this.httpService.post(`/sync`, {
			separator: payload.separator,
			root: payload.root,
			files: payload.files,
		});
	}

	public async upload() {
		let index = 0;
		console.log("Does it reach this?");
		this.$uploading.next(true);
		const sleep = (time: number) => {
			return new Promise((resolve) => setTimeout(resolve, time));
		};

		for (const file of this.$queue.getValue()) {
			index++;

			if (file.done) {
				continue;
			}
			const queue = this.$queue.getValue();
			queue[index - 1].progress = 0;
			const formData = new FormData();

			const parts: string[] = file.name.split(this.separator);
			const name = parts[parts.length - 1];

			let filePath = file.webkitRelativePath || (file as File).name;

			const rootPaths = this.root;
			for (const root of rootPaths) {
				filePath = filePath.replace(root, "");
			}

			const cleanedPath = filePath.replace(/\\/g, "/");
			const filePathDir = cleanedPath.split("/");

			filePathDir.pop();
			filePathDir.shift();

			const dir = filePathDir.join("/");

			formData.append("data", file);
			formData.append("name", name);
			formData.append("file", filePath);
			formData.append("dir", dir);
			formData.append("separator", this.separator);
			formData.append("root", JSON.stringify(this.root));

			await this.httpService.upload(`/sync/upload`, formData, true).
				pipe(map((event: any) => {
					console.log("HERE", event);
					if (event.type === HttpEventType.UploadProgress) {
						queue[index - 1].progress = Math.round(100 * event.loaded / event.total);
					}
				})).toPromise().catch((err) => console.log("Failed to upload", err));

			console.log(`Syncing file ${index}/${this.$queue.getValue().length}`);
			queue[index - 1].progress = 100;
			queue[index - 1].done = true;
			this.$queue.next(queue);

			await sleep(1000);

		}
		this.$queue.next([]);
		this.$uploading.next(false);
	}
}