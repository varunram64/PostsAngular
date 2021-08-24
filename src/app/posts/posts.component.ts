import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  private url: string = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { 
    // Only initialize objects here not implementation
  }

  createPost(titleInput: HTMLInputElement) {
    let post = {
      "id": "",
      "title": titleInput.value
    };

    this.http.post(this.url, 
      JSON.stringify(post)
    )
    .subscribe(response => {
      const postRes: any = response;
      if (postRes.hasOwnProperty("id")) {
        post.id = postRes["id"];
        this.posts.splice(0, 0, post);
      }
    });
  }

  updatePost(post: any){
    this.http.patch(this.url + `/${post?.id}`, JSON.stringify({ isRead: true }))
    .subscribe(response => {
      console.log(response);
    });
  }

  deletePost(post: any){
    this.http.delete(this.url + `/${post?.id}`)
    .subscribe(response => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
      console.log(response);
    });
  }

  ngOnInit() {
    this.http.get(this.url)
    .subscribe(response => {
      let res = JSON.stringify(response);
      this.posts = [];
      this.posts = JSON.parse(res);
    });
  }

}
