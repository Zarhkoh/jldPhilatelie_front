import { Component, OnInit } from '@angular/core';
import { TimbreService } from 'src/app/services/timbre.service';
import { Timbre } from 'src/app/models/timbre';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { FileUploadService } from 'src/app/services/file-upload.service';



@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  display = false;
  selectedTimbre = new Timbre();
  cols;
  timbreList = [];
  selectedImage;
  imageFile;
  loading: boolean;
  timbreForm: FormGroup;
  editableTimbreId: number;
  timbreForEdition;
  reader;
  responseImageUploadUrl;
  constructor(private fileUploadService: FileUploadService,
    private toastService: ToastService,
    private timbreService: TimbreService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.reader = new FileReader();
    this.editableTimbreId = 0;
    this.loading = false;
    this.getAllTimbres();
    this.setupForm();
  }

  setupForm(): void {
    this.timbreForm = this.formBuilder.group({
      numero: [],
      prix: [],
      image: [],
      quantite: [],
      categorie: [],
      etat: ['neuf'],
      anneeCoinDate: [],
      optionalInfos: [],
      tasType: []
    });
  }
  getAllTimbres(): void {
    this.loading = true;
    this.timbreService.getAllTimbres().subscribe(data => {
      this.timbreList = data as Timbre[];
      this.loading = false;
    });
  }

  async addTimbre(): Promise<any> {
    try {
      this.responseImageUploadUrl = await this.uploadImg();
      this.timbreForm.patchValue({ image: this.responseImageUploadUrl.secure_url });
      this.timbreService.addTimbre(this.timbreForm.value).subscribe(data => {
        this.toastService.showSuccess(`Timbre n°${this.timbreForm.value.numero} créé`);
        this.setupForm();
        this.getAllTimbres();
      });
    } catch (error) {
      this.toastService.showDanger(error);
    }
  }

  async uploadImg(): Promise<any> {
    return await this.fileUploadService.upload(this.selectedImage, this.imageFile.name.split('.').slice(0, -1)[0]);
  }

  deleteTimbreById(timbre) {
    this.timbreService.deleteTimbreById(timbre.timbreId).subscribe(data => {
      if (data === 1) {
        this.timbreList.splice(this.timbreList.indexOf(timbre), 1);
        this.toastService.showSuccess(`Timbre n°${timbre.numeroTimbre} supprimé`);
      }
    });
  }

  changeTimbreQte(timbre, operation) {
    if (operation === 'plus') {
      timbre.quantiteTimbre += 1;
    } else if (operation === 'minus') {
      timbre.quantiteTimbre -= 1;
    }
    this.updateTimbre(timbre);
  }

  updateTimbre(timbre) {
    this.timbreService.updateTimbre(timbre).subscribe(data => {
      this.timbreList.splice(this.timbreList.indexOf(this.timbreList.find(x => x.timbreId == this.timbreForEdition.timbreId)), 1, this.timbreForEdition);
      this.editableTimbreId = 0;
      this.toastService.showSuccess('Timbre n°' + timbre.numeroTimbre + ' mis à jour.');
    }), error => console.log(error);
  }

  setCat(cat) {
    this.timbreForm.controls['categorie'].setValue(cat);
  }

  allowTimbreEdition(timbre) {
    this.editableTimbreId = timbre.timbreId;
    this.timbreForEdition = new Timbre;
    this.timbreForEdition.timbreId = timbre.timbreId;
    this.timbreForEdition.numeroTimbre = timbre.numeroTimbre;
    this.timbreForEdition.catTimbre = timbre.catTimbre;
    this.timbreForEdition.prixTimbre = timbre.prixTimbre;
    this.timbreForEdition.imageTimbreUrl = timbre.imageTimbreUrl;
    this.timbreForEdition.etatTimbre = timbre.etatTimbre;
    this.timbreForEdition.quantiteTimbre = timbre.quantiteTimbre;
    this.timbreForEdition.anneeCoinDate = timbre.anneeCoinDate;
    this.timbreForEdition.optionalInfos = timbre.optionalInfos;
    this.timbreForEdition.tasType = timbre.tasType;

  }
  abortEdition() {
    this.editableTimbreId = 0;
  }

  setImageFile(imageInput: any) {
    this.imageFile = imageInput.files[0];
    this.reader.addEventListener('load', (event: any) => {
      this.selectedImage = event.target.result;
    });
    this.reader.readAsDataURL(this.imageFile);
  }

  showDialog(timbre) {
    this.display = true;
    this.selectedTimbre = timbre as Timbre;
  }
}
