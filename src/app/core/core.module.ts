import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ThemeService } from "./services/theme.service";
import { UserService } from "./services/user.service";
import { StripeService } from "./services/stripe.service";
import { HttpService } from "./services/http.service";
import { AuthService } from "./services/auth.service";
import { HttpClientModule } from "@angular/common/http";



@NgModule({
	declarations: [],
	providers: [ThemeService, UserService, StripeService, HttpService, AuthService],
	imports: [
		HttpClientModule,
		CommonModule
	]
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		throwIfAlreadyLoaded(parentModule, "CoreModule");
	}
}
function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
	if (parentModule) {
		throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
	}
}
