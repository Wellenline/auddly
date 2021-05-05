import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TooltipDirective } from "./directives/tooltip.directive";
import { InterfaceService } from "./services/interface.service";
import { TooltipComponent } from "./components/tooltip/tooltip.component";
import { ButtonComponent } from "./components/button/button.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SelectComponent } from "./components/select/select.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NotifyComponent } from "./components/notify/notify.component";
import { DialogComponent } from "./components/dialog/dialog.component";
import { ToggleComponent } from "./components/toggle/toggle.component";
import { ModalComponent } from "./components/modal/modal.component";
import { ContenteditableModel } from "./directives/contenteditable.directive";
import { DropdownComponent } from "./components/dropdown/dropdown.component";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Scroll } from "@angular/router";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { AutoSizeDirective } from './directives/auto-size.directive';
import { DragDropDirective } from './directives/drag-drop.directive';
import { VirtualScrollerModule } from "ngx-virtual-scroller";
import { HeaderComponent } from "./components/header/header.component";
import { ShinerComponent } from './components/shiner/shiner.component';



@NgModule({
	declarations: [
		ContenteditableModel,
		TooltipDirective,
		TooltipComponent,
		SelectComponent,
		ButtonComponent,
		LoadingComponent,
		NotifyComponent,
		DialogComponent,
		ToggleComponent,
		ModalComponent,
		DropdownComponent,
		AutoSizeDirective,
		DragDropDirective,
		HeaderComponent,
		ShinerComponent,],
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		BrowserModule,
		DragDropModule,
		VirtualScrollerModule,
		ScrollingModule
	],
	providers: [InterfaceService],
	exports: [
		TooltipDirective,
		ContenteditableModel,
		TooltipComponent,
		DialogComponent,
		NotifyComponent,
		ButtonComponent,
		SelectComponent,
		LoadingComponent,
		ToggleComponent,
		ModalComponent,
		DropdownComponent,
		CommonModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		BrowserModule,
		ScrollingModule,
		DragDropModule,
		AutoSizeDirective,
		HeaderComponent,
		DragDropDirective,
		ShinerComponent,

	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

})
export class SharedModule { }
