import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';

import { Post } from './post.model';

import { ToastrService } from 'ngx-toastr';



@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();
  loadedPosts: Post[] = [];
  isFetching = false;
  tokenId: Promise<string>;

 
  constructor(private http: HttpClient, private toastService: ToastrService) {}

  createAndStorePost(title: string) {
    if(title != undefined && title.trim().length > 0){
    const postData: Post = { title: title};
    this.tokenId.then((token) => {
      this.getfetchPosts(title)
      .subscribe(data => {
        console.log(data);
        if(data.length > 0){
          this.toastService.error(`Un post con contenuto: ${title} è già presente`,'Errore',{
            timeOut: 2000
          });
        }else{
          this.http
          .post<{ name: string }>(
            'https://ng-project-74610-default-rtdb.firebaseio.com/posts.json',
            postData,
            {
              params: new HttpParams().set('auth', token ?? '')
            } 
          )
          .subscribe(() => this.toastService.success('Post creato con successo!','Success',{
            timeOut: 1500,
            progressBar: true , 
            progressAnimation: 'increasing',
          })
         );
        }  
      })
      console.log(token);
    });
  };   
}

  deletePosts(id: string) {
    this.tokenId.then((token)=>{
      this.http
      .delete('https://ng-project-74610-default-rtdb.firebaseio.com/posts/'+ id +'.json', {
        params: new HttpParams().set('auth', token ?? '')
      })
      .subscribe((response)=> console.log(response));
    }).catch((error)=> console.log(error));

  }

 
 getfetchPosts(searchString: string){

  return this.http
    .get<{ [key: string]: Post }>(
      'https://ng-project-74610-default-rtdb.firebaseio.com/posts.json',
      {
        responseType: 'json'
      }
    )
    .pipe(
      map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (searchString.trim().length > 0 && responseData[key].title.toLowerCase().includes(searchString.toLowerCase())){
            postsArray.push({title: responseData[key].title, id: key});
            console.log(key);
          }
        }
        return postsArray;
      }),
      catchError(errorRes => {
        return throwError(() => new Error(errorRes));
      })
    );
}

getAllPosts(): Observable<Post[]>{
  return this.http
  .get<{ [key: string]: Post }>(
    'https://ng-project-74610-default-rtdb.firebaseio.com/posts.json',
    {
      responseType: 'json'
    }
  )
  .pipe(
    map(responseData => {
      const postsArray: Post[] = [];
      for (const key in responseData) {
          postsArray.push({title: responseData[key].title, id: key});
          console.log(key);
      }
      return postsArray;
    }),
    catchError(errorRes => {
      return throwError(() => new Error(errorRes));
    })
  );

}

}
