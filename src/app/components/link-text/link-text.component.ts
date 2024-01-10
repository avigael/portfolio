import { Component, Input } from "@angular/core";

@Component({
  selector: "app-link",
  templateUrl: "./link-text.component.html",
  styleUrls: ["./link-text.component.css"],
})
export class LinkTextComponent {
  @Input() footer = false;
  @Input() text = "";
  @Input() url = "";
}

