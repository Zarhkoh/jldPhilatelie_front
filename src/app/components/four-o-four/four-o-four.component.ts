import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-four-o-four',
  templateUrl: './four-o-four.component.html',
  styleUrls: ['./four-o-four.component.css']
})
export class FourOFourComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) { }

  ngOnInit(): void {
    this.title.setTitle('Jld-philatelie - Timbres francais jusqu\'a 80 % de remise.');
    this.meta.updateTag({
      name: 'description', content: 'Vendeur particulier de timbres français, je vends mes timbres jusqu\'à 80% de remise sur la côte Yvert et Tellier dans le seul but de m\'acheter d\'autres timbres pour étoffer ma collection.'
    });
  }

}
