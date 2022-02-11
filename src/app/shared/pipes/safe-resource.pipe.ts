import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Pipe({
	name: "safeResource"
})
export class SafeResourcePipe implements PipeTransform {

	constructor(private readonly sanitizer: DomSanitizer) { }

	public transform(url: string): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
}
