import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { lista } from 'src/app/Shared/lista';

import { Post } from 'src/app/Shared/post.model';
import { PostsService } from 'src/app/Shared/posts.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isFetching = true;
  text:string;
  show:boolean;
  list: lista[]=[];
  nuovaList : string ;
  loadedPosts: Post[] = [];
  searchString: string;


  postForm: NgForm;

  constructor(
    private postsService: PostsService,
    public afAuth: AngularFireAuth
    ) { }
    
  
  onCreatePost(postData: Post){
    this.postsService.createAndStorePost(postData.title)
  }

  searchPost(value: string){
    this.postsService.getfetchPosts(value).subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      });
  }

  onDelete(id: string){
    this.postsService.deletePosts(id);
    this.loadedPosts= this.loadedPosts.filter((post) => post.id != id);
  }


  onFetchPosts(){
    this.postsService.getfetchPosts(this.searchString).subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      });
  }

  addTask() {
    if(this.nuovaList){
     let testo = new lista();
      testo.name = this.nuovaList;
      testo.isCompleted = true;
      this.list.push(testo);
      this.nuovaList = '';
    }else {
      alert('Per favore Aggiungi qualcosa alla Lista');
   }
   console.log(this.list);
  }
  

  logout(){
    this.afAuth.signOut();
  }



}

