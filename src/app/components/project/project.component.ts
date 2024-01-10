import { Component, Input } from "@angular/core";
import { Project } from "src/app/interfaces/utility.interface";

@Component({
  selector: "app-project-card",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.css"],
})
export class ProjectCardComponent {
  @Input() project!: Project;
}

