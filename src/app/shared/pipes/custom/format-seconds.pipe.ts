import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "formatSeconds",
})
export class FormatSecondsPipe implements PipeTransform {

	public transform(totalSeconds: number, ...args: unknown[]) {
		const hours = Math.floor(totalSeconds / 3600);

		totalSeconds %= 3600;

		const minutes = Math.floor(totalSeconds / 60);
		const seconds = Math.round(totalSeconds % 60);
		const fminutes = String(minutes).padStart(2, "0");
		const fhours = String(hours).padStart(2, "0");
		const fseconds = String(seconds).padStart(2, "0");
		return hours > 0 ? `${fhours}:${fminutes}:${fseconds}` : `${fminutes}:${fseconds}`;

	}

}
