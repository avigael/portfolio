import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ExperienceCardComponent } from "./components/experience/experience.component";
import { ProjectCardComponent } from "./components/project/project.component";
import { LinkTextComponent } from "./components/link-text/link-text.component";
import { SocialMediaComponent } from "./components/social-media/social-media.component";

@NgModule({
  declarations: [AppComponent, ExperienceCardComponent, ProjectCardComponent, LinkTextComponent, SocialMediaComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

