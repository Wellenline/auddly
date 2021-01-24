import { Component, HostListener, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private playerService: PlayerService, public playlistService: PlaylistService) { }
  ngOnInit() {
    const color = localStorage.getItem("accent-color");

    if (color) {
      document.documentElement.style.setProperty("--accent-color", color);

    }

  }
  @HostListener("document:keypress", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    // 
  }

}
