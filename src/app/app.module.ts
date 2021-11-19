import { AppErrorHandler } from './common/app-error-handler';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostService } from './services/post.service';
import { FollowersComponent } from './followers/followers.component';
import { PostsRoutingModule } from './posts/posts-routing.module';
import { FollowersRoutingModule } from './followers/followers-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    FollowersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PostsRoutingModule,
    FollowersRoutingModule,
    HttpClientModule
  ],
  providers: [
    PostService,
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
