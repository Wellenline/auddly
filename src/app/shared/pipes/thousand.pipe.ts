import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "thousand"
})
export class ThousandPipe implements PipeTransform {

	transform(num: any, ...args: unknown[]): unknown {
		return `$` + (Math.abs(num) > 999 ? Math.sign(num) * +((Math.abs(num) / 1000).toFixed(1)) + "K" : Math.sign(num) * Math.abs(num));

	}

}
