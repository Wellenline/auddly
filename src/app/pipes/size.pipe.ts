import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "size",
})
export class SizePipe implements PipeTransform {

	transform(value: number) {
		if (!value) {
			return "0 Bytes";
		}
		const k = 1024;

		const dm = 2;
		const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
		const i = Math.floor(Math.log(value) / Math.log(k));

		return parseFloat((value / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
	}

}
