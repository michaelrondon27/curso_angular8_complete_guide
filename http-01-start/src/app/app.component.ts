import { Component, OnInit } from '@angular/core';

import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isFetching = false;

  loadedPosts: Post[] = [];

  constructor(
    private postsService: PostsService
  ) {}

  ngOnInit() {

    this.postsService.fetchPosts();

  }

  onCreatePost(postData: Post) {

    this.postsService.createAndStorePost( postData.title, postData.content );

  }

  onFetchPosts() {

    this.postsService.fetchPosts();

  }

  onClearPosts() {
    // Send Http request
  }


}
