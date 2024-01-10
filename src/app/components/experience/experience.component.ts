import { Component, Input } from "@angular/core";
import { Experience } from "src/app/interfaces/utility.interface";

@Component({
  selector: "app-experience-card",
  templateUrl: "./experience.component.html",
  styleUrls: ["./experience.component.css"],
})
export class ExperienceCardComponent {
  @Input() experience!: Experience;
}

