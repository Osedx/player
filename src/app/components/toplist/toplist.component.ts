import { Component, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { PlaylistState } from '../../services/playlist-state.service';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'my-toplist',
    templateUrl: './toplist.component.html',
    styleUrls: ['./toplist.component.css']
})

export class ToplistComponent {
    @ViewChild('playlistplayer') public playlistplayer: ElementRef;
    constructor( public playlistState: PlaylistState, public dataservice: DataService) {
        this.playlistState.playList = [];
        this.playlistState.activeVideo = undefined;
        this.playlistState.activeVideoPosition = 0;
        this.getToplist();
    }
    public getToplist() {
        this.dataservice.getToplist().subscribe(
        (data) => {
            this.playlistState.playList = data;
            console.log('toplist');
            this.playlistState.playListSize = data.length;
            if (this.playlistState.playList.length > 0) {
                this.playlistState.activeVideo = this.playlistState.playList[0];
                console.log(this.playlistState.playList);
                this.playlistState.activeVideoPosition = 0;
            }
            this.playlistState.playListFilled.next();
            },
    (error) => { console.log(error); } );
    }

    public shuffle() {
        this.playlistState.loop = false;
        this.playlistState.shuffle = !this.playlistState.shuffle;
    }
    public loop() {
        this.playlistState.shuffle = false;
        this.playlistState.loop = !this.playlistState.loop;
    }
    public nextVideo() {
    if (this.playlistState.activeVideoPosition + 1 ===
    this.playlistState.playListSize) {
    this.playlistState.activeVideoPosition = 0;
    } else {
    this.playlistState.activeVideoPosition =
    this.playlistState.activeVideoPosition + 1;
    }
    this.playlistState.activeVideo =
    this.playlistState.playList[this.playlistState.activeVideoPosition];
    this.playlistState.player.loadVideoById(
    this.playlistState.playList[this.playlistState.activeVideoPosition]._id
        );
    }
    public previousVideo() {
    if (this.playlistState.activeVideoPosition === 0) {
    this.playlistState.activeVideoPosition = this.playlistState.playListSize - 1;
    } else {
    this.playlistState.activeVideoPosition =
    this.playlistState.activeVideoPosition - 1;
    }
    this.playlistState.activeVideo =
    this.playlistState.playList[this.playlistState.activeVideoPosition];
    this.playlistState.player.loadVideoById(
    this.playlistState.playList[this.playlistState.activeVideoPosition]._id
        );
    }
    public changeState() {
        this.playlistState.paused = !this.playlistState.paused;
    }
    public pause() {
        this.playlistState.player.pauseVideo();
        this.playlistState.paused = true;
    }
    public play() {
        this.playlistState.player.playVideo();
        this.playlistState.paused = false;
    }
}
