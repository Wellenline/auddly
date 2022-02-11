import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";
@Pipe({
	name: "moment",
})
export class MomentPipe implements PipeTransform {

	public transform(value: any, args: string): any {
		try {
			if (value) {
				let date = moment(new Date(value).toISOString().substring(0, 10));
				if (args.includes("h:mm:ss")) {
					date = moment(moment(new Date(value)).format("YYYY-MM-DDTHH:mm:ss")); // moment(new Date(value).toISOString().substring(0, 10))

				}
				if (date.isValid()) {
					return date.format(args || "L");
				} else {
					return value;
				}
			} else {
				return value;
			}

		} catch (e) {
			console.info(e);
		}
		// moment(new Date().toISOString().substring(0, 10)).format('MM/DD/YYYY');
	}

}
