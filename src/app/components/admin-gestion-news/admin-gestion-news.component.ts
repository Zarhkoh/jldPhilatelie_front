import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { News } from 'src/app/models/news';
import { ToastService } from 'src/app/services/toast.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-admin-gestion-news',
  templateUrl: './admin-gestion-news.component.html',
  styleUrls: ['./admin-gestion-news.component.css']
})
export class AdminGestionNewsComponent implements OnInit {
  newsText = 'AA';
  news;
  constructor(private newsService: NewsService, private toastService: ToastService, private logger: LogService) { }

  ngOnInit(): void {
    this.getNews()
  }
  getNews(){
    try {
      this.newsService.getNews().subscribe(data => {
        this.news =  data[0] as News;
        this.newsText = this.news.textNews;
      })
    } catch (error) {
      this.logger.error(error,"admin-gestion-news-component");
      this.toastService.showDanger(error);
    }

  }

  updateNews(){
    try {
      this.news.textNews = this.newsText;
      this.newsService.updateNews(this.news).subscribe(data => {
        this.toastService.showSuccess(`La news a bien été mise à jour.`);
        this.getNews();
      });
    } catch (error) {
      this.logger.error(error,"admin-gestion-news-component");
      this.toastService.showDanger(error);
    }
  }
}
