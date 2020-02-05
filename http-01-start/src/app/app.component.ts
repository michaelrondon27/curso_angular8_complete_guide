import { Component, OnInit } from '@angular/core';

import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  error = null;

  isFetching = false;

  loadedPosts: Post[] = [];

  constructor(
    private postsService: PostsService
  ) {}

  ngOnInit() {

    this.isFetching = true;

    this.postsService.fetchPosts().subscribe( posts => {

      this.isFetching = false;

      this.loadedPosts = posts;

    }, error => {

      this.error = error.message;

    });

  }

  onCreatePost(postData: Post) {

    this.postsService.createAndStorePost( postData.title, postData.content );

  }

  onFetchPosts() {

    this.isFetching = true;

    this.postsService.fetchPosts().subscribe( posts => {

      this.isFetching = false;

      this.loadedPosts = posts;

    }, error => {

      this.error = error.message;

    });

  }

  onClearPosts() {

    this.postsService.deletePosts().subscribe( () => {

      this.loadedPosts = [];

    });

  }


}
