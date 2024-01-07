import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-experience-card",
  templateUrl: "./experience.component.html",
  styleUrls: ["./experience.component.css"],
})
export class ExperienceCardComponent implements OnInit {
  @Input() startDate = "";
  @Input() endDate = "PRESENT";
  @Input() workTitle = "";
  @Input() organization = "";
  @Input() description = "";
  @Input() url = "https://google.com";
  @Input() tags: string[] = [];

  ngOnInit(): void {
    this.startDate = "2000";
    this.workTitle = "Software Engineer";
    this.organization = "Company";
    this.description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec feugiat massa. Proin cursus felis nec pulvinar placerat. Curabitur id magna tempus, porta turpis ut, cursus orci. Curabitur ut fermentum urna.";
    this.tags = ["Tag A", "Tag B", "Tag C"];
  }
}

