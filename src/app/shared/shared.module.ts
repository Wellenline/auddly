import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { OverlayModule } from "@angular/cdk/overlay";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { TextFieldModule } from "@angular/cdk/text-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownComponent } from "./components/dropdown/dropdown.component";
import { ToastComponent } from "./components/toast/toast.component";
import { RippleDirective, DragDropDirective, ContenteditableDirective, ActivateNextInputDirective, DropdownTriggerForDirective } from "./directives";
import { LoadingComponent } from "./components/loading/loading.component";
import { ThemeToggleComponent } from "./components/theme-toggle/theme-toggle.component";
import { HeaderComponent } from "./components/header/header.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app-routing.module";
import { RouterModule } from "@angular/router";
import { ModalComponent } from "./components/modal/modal.component";
import { PortalModule } from "@angular/cdk/portal";
import { AvatarComponent } from "./components/avatar/avatar.component";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { CdkTreeModule } from "@angular/cdk/tree";;
import { TagInputComponent } from "./components/tag-input/tag-input.component";
import { InfiniteScrollComponent } from "./components/infinite-scroll/infinite-scroll.component";
import { SizePipe } from "./pipes/custom/size.pipe";
import { FormatSecondsPipe } from "./pipes/custom/format-seconds.pipe";
import { SliderComponent } from "./components/slider/slider.component";
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';



@NgModule({
	declarations: [
		ToastComponent,
		RippleDirective,
		DragDropDirective,
		ContenteditableDirective,
		ActivateNextInputDirective,
		DropdownComponent,
		DropdownTriggerForDirective,
		LoadingComponent,
		ThemeToggleComponent,
		HeaderComponent,
		ModalComponent,
		SizePipe,
		FormatSecondsPipe,
		AvatarComponent,
		TagInputComponent,
		InfiniteScrollComponent,
		SliderComponent,
		InfiniteScrollDirective

	],
	imports: [
		CommonModule,
		RouterModule,
		PortalModule,
		HttpClientModule,
		TextFieldModule,
		DragDropModule,
		OverlayModule,
		ScrollingModule,
		CdkTreeModule,
		FormsModule,
		ReactiveFormsModule,
		LazyLoadImageModule,

	],
	exports: [
		HttpClientModule,
		FormsModule,
		CdkTreeModule,

		ReactiveFormsModule,
		RippleDirective,
		DragDropModule,
		DragDropDirective,
		ContenteditableDirective,
		ActivateNextInputDirective,
		TextFieldModule,
		DropdownComponent,
		DropdownTriggerForDirective,
		LoadingComponent,
		ThemeToggleComponent,
		HeaderComponent,
		ModalComponent,
		AvatarComponent,
		LazyLoadImageModule,
		TagInputComponent,
		InfiniteScrollComponent,
		SizePipe,
		FormatSecondsPipe,
		SliderComponent,
		InfiniteScrollDirective

	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
