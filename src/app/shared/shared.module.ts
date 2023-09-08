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
import { RippleDirective, DragDropDirective, InfiniteScrollDirective, DragScrollDirective, DropdownTriggerForDirective } from "./directives";
import { LoadingComponent } from "./components/loading/loading.component";
import { ThemeToggleComponent } from "./components/theme-toggle/theme-toggle.component";
import { HeaderComponent } from "./components/header/header.component";
import { RouterModule } from "@angular/router";
import { ModalComponent } from "./components/modal/modal.component";
import { PortalModule } from "@angular/cdk/portal";
import { LazyLoadImageModule } from "ng-lazyload-image";

import { SizePipe } from "./pipes/custom/size.pipe";
import { FormatSecondsPipe } from "./pipes/custom/format-seconds.pipe";
import { SliderComponent } from "./components/slider/slider.component";
import { LayoutModule } from "@angular/cdk/layout";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { SidebarTriggerForDirective } from "./directives/sidebar-trigger-for.directive";
import { AvatarComponent } from "./components/avatar/avatar.component";
import { LoaderDirective } from "./directives/loader/loader.directive";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TooltipDirective } from "../standalone/tooltip/tooltip.directive";



@NgModule({
	declarations: [
		ToastComponent,
		RippleDirective,
		DragDropDirective,
		DropdownComponent,
		DropdownTriggerForDirective,
		LoadingComponent,
		ThemeToggleComponent,
		HeaderComponent,
		ModalComponent,
		SizePipe,
		FormatSecondsPipe,
		SliderComponent,
		InfiniteScrollDirective,
		DragScrollDirective,
		SidebarComponent,
		SidebarTriggerForDirective,
		AvatarComponent,

	],
	imports: [
		CommonModule,
		RouterModule,
		PortalModule,
		HttpClientModule,
		LayoutModule,
		TextFieldModule,
		DragDropModule,
		OverlayModule,
		ScrollingModule,
		FormsModule,
		ReactiveFormsModule,
		LazyLoadImageModule,
		TooltipDirective,
		LoaderDirective,
		BrowserAnimationsModule
	],
	exports: [
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		RippleDirective,
		ScrollingModule,
		DragDropModule,
		DragDropDirective,
		TextFieldModule,
		DropdownComponent,
		DropdownTriggerForDirective,
		LoadingComponent,
		TooltipDirective,
		ThemeToggleComponent,
		HeaderComponent,
		ModalComponent,
		LazyLoadImageModule,
		SizePipe,
		LayoutModule,
		FormatSecondsPipe,
		SliderComponent,
		InfiniteScrollDirective,
		DragScrollDirective,
		SidebarComponent,
		SidebarTriggerForDirective,
		AvatarComponent,
		LoaderDirective,

	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
