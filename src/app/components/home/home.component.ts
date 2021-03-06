import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';
import { LivraisonService } from 'src/app/services/livraison.service';
import { LogService } from 'src/app/services/log.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private newsService: NewsService, private livraisonService: LivraisonService, private logger: LogService) { }
  news;
  livraisons;
  changementLivraisonDate = new Date("01/01/1900");
  ngOnInit(): void {
    this.getNews();
    this.getLivraisons();
  }

  getNews(){
    try {
      this.newsService.getNews().subscribe(data => {
        this.news =  data[0] as News;
      })
    } catch (error) {
      this.logger.error(error,"home.component");
    }
  }
  
  getLivraisons(){
    try {
      this.livraisonService.getAllLivraisons().subscribe(data => {
        this.livraisons = data;
        this.livraisons.forEach(livraison => {
          let date = new Date(livraison.dateEditionLivraison);
          if(date > this.changementLivraisonDate){
            this.changementLivraisonDate = date;
          }
              });
      })
    } catch (error) {
      this.logger.error(error, "home.component");
    }

  }
}
