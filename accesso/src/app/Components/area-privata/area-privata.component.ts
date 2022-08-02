import { Component, OnInit } from '@angular/core';
import { lista } from 'src/app/Shared/lista';
import { Post } from 'src/app/Shared/post.model'; 
import { PostsService } from 'src/app/Shared/posts.service';

@Component({
  selector: 'app-area-privata',
  templateUrl: './area-privata.component.html',
  styleUrls: ['./area-privata.component.css']
})
export class AreaPrivataComponent implements OnInit {

  isFetching = true;
  text:string;
  show:boolean;
  list: lista[]=[];
  nuovaList : string ;
  loadedPosts: Post[] = [];
  searchString: string;
  tempPosts: Post[] = [];


  constructor( private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getAllPosts().subscribe(posts => {
      console.log('inizzializzato')
      this.loadedPosts = posts;
      this.tempPosts = this.loadedPosts;
    })
  }


  onFetchPosts(){
    this.postsService.getfetchPosts(this.searchString).subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      });
  }

  
  searchPost(value: string){
   this.tempPosts = this.loadedPosts.filter(post => post.title.toLowerCase().includes(value.toLowerCase()));
  }

  onDelete(id: string){
    this.postsService.deletePosts(id);
    this.tempPosts= this.loadedPosts.filter((post) => post.id != id);
  }




}
