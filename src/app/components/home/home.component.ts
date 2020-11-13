import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';
import { LivraisonService } from 'src/app/services/livraison.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private newsService: NewsService, private livraisonService: LivraisonService) { }
  news;
  livraisons;
  ngOnInit(): void {
    this.getNews();
    this.getLivraisons();
  }

  getNews(){
    this.newsService.getNews().subscribe(data => {
      this.news =  data[0] as News;
    })
  }
  
  getLivraisons(){
    this.livraisonService.getAllLivraisons().subscribe(data => {
      this.livraisons = data;
    })
  }
}
