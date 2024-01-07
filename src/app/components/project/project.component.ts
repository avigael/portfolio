import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-project-card",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.css"],
})
export class ProjectCardComponent implements OnInit {
  @Input() projectTitle = "TITLE";
  @Input() description = "DESCRIPTION GOES HERE";
  @Input() image = "https://media.gcflearnfree.org/ctassets/topics/246/share_size_medium.jpg";
  @Input() url = "https://google.com";
  @Input() tags: string[] = [];

  ngOnInit(): void {
    this.projectTitle = "Project";
    this.description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec feugiat massa. Proin cursus felis nec pulvinar placerat.";
    this.tags = ["Tag A", "Tag B", "Tag C"];
  }
}

