import { Component, HostListener, OnInit } from "@angular/core";
import { PROJECTS } from "src/assets/projects.data";
import { Experience, Project } from "./interfaces/utility.interface";
import { EXPERIENCE } from "src/assets/experience.data";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  currentDate = new Date();
  activeNav = "about";
  projects: Project[] = PROJECTS;
  experience: Experience[] = EXPERIENCE;

  ngOnInit(): void {
    this.setActiveNav();
  }

  setActiveNav(page?: string): void {
    let name = "about";
    if (!page) {
      const urlParts = window.location.href.split("#");
      if (urlParts.length > 1) {
        name = urlParts[1];
      }
    } else {
      name = page;
    }
    this.activeNav = name;
  }

  @HostListener("window:scroll")
  onScroll(): void {
    const sections = ["about", "experience", "projects"];
    const readingLine = window.scrollY + window.innerHeight * 0.35;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element && element.offsetTop <= readingLine) {
        this.activeNav = section;
      }
    }
  }
}
