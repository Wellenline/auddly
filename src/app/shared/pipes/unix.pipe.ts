import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
	name: "unix"
})
export class UnixPipe implements PipeTransform {

	transform(value: number, args: string = "YYYY-MM-DD"): unknown {
		return moment(value * 1000).format(args);
	}

}
