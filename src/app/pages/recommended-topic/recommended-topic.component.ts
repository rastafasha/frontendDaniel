import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommended-topic',
  templateUrl: './recommended-topic.component.html',
  styleUrls: ['./recommended-topic.component.css']
})
export class RecommendedTopicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
