import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { News } from 'src/app/models/news';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-admin-gestion-news',
  templateUrl: './admin-gestion-news.component.html',
  styleUrls: ['./admin-gestion-news.component.css']
})
export class AdminGestionNewsComponent implements OnInit {
  newsText = 'AA';
  news;
  constructor(private newsService: NewsService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.getNews()
  }
  getNews(){
    this.newsService.getNews().subscribe(data => {
      console.log(data[0]);
      this.news =  data[0] as News;
      this.newsText = this.news.textNews;
    })
  }

  updateNews(){
    try {
      this.news.textNews = this.newsText;
      console.log("ENVOI POUR EDITION: ",this.news);
      this.newsService.updateNews(this.news).subscribe(data => {
        console.log("update: " + data);
        this.toastService.showSuccess(`La news a bien été mise à jour.`);
        this.getNews();
      });
    } catch (error) {
      this.toastService.showDanger(error);
    }
  }
}
