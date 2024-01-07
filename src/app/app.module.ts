import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ExperienceCardComponent } from "./components/experience/experience.component";
import { ProjectCardComponent } from "./components/project/project.component";

@NgModule({
  declarations: [AppComponent, ExperienceCardComponent, ProjectCardComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

