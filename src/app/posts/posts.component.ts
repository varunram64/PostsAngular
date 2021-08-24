import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];

  constructor(private service: PostService) { 
    // Only initialize objects here not implementation
  }

  createPost(titleInput: HTMLInputElement) {
    let post = {
      "id": "",
      "title": titleInput.value
    };

    this.service.createPost(post)
    .subscribe(response => {
      const postRes: any = response;
      if (postRes.hasOwnProperty("id")) {
        post.id = postRes["id"];
        this.posts.splice(0, 0, post);
      }
    },
    (error: Response) => {
      if(error.status == 400)
        alert('Form Errors');
      else
        alert('An unexpected error occurred');
      console.log(error);
    });
  }

  updatePost(post: any){
    this.service.updatePost(post)
    .subscribe(response => {
      console.log(response);
    },
    error => {
      alert('An unexpected error occurred');
      console.log(error);
    });
  }

  deletePost(post: any){
    this.service.deletePost(post?.id)
    .subscribe(response => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
      console.log(response);
    },
    (error: Response) => {
      if(error.status == 404)
        alert('This post is already been deleted');
      else 
        alert('An unexpected error occurred');
      console.log(error);
    });
  }

  ngOnInit() {
    this.service.getPosts()
    .subscribe(response => {
      let res = JSON.stringify(response);
      this.posts = [];
      this.posts = JSON.parse(res);
    },
    error => {
      alert('An unexpected error occurred');
      console.log(error);
    });
  }

}
