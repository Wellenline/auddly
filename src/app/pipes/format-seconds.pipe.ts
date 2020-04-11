import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "formatSeconds",
})
export class FormatSecondsPipe implements PipeTransform {

	public transform(value: number, ...args: unknown[]): unknown {
		const date = new Date(null);
		date.setSeconds(value);
		return date.toISOString().substr(14, 5);
	}

}
