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

  @HostListener("window:scroll", ["$event"])
  onScroll() {
    var about = document.getElementById("about");
    var experience = document.getElementById("experience");

    if (experience && scrollY > experience.offsetHeight) {
      this.activeNav = "projects";
    } else if (about && scrollY > about.offsetHeight) {
      this.activeNav = "experience";
    } else {
      this.activeNav = "about";
    }
  }
}

