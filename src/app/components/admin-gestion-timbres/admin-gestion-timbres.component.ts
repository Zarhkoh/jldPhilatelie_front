import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Timbre } from 'src/app/models/timbre';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LogService } from 'src/app/services/log.service';
import { TimbreService } from 'src/app/services/timbre.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-admin-gestion-timbres',
  templateUrl: './admin-gestion-timbres.component.html',
  styleUrls: ['./admin-gestion-timbres.component.css']
})
export class AdminGestionTimbresComponent implements OnInit {

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
    private formBuilder: FormBuilder,
    private logger: LogService) { }

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
      isPaire: false,
      categorie: [],
      etat: ['neuf'],
      anneeCoinDate: [],
      optionalInfos: [],
      tasType: []
    });
    this.selectedImage = null;
  }
  getAllTimbres(): void {
    this.loading = true;
    try {
      this.timbreService.getAllTimbres().subscribe(data => {
        this.timbreList = data as Timbre[];
        this.loading = false;
      });

    } catch (error) {
      this.logger.error(error, "admin-gestion-timbres.component");
      this.toastService.showDanger(error);
    }
  }

  async addTimbre(): Promise<any> {
    try {
      // Lance une erreur s'il manque le numéro du timbre
      if ((this.timbreForm.value.numero === null || this.timbreForm.value.numero === '')) {
        throw new Error('Merci de renseigner le numéro du timbre.');
        // Lance une erreur si le prix est incohérent
      } else if (this.timbreForm.value.prix <= 0) {
        throw new Error('Merci de renseigner le prix du timbre.');
      } else if (this.timbreForm.value.quantite == null) {
        throw new Error('Merci de renseigner la quantité du timbre.');
      } else if (this.selectedImage == null) {
        throw new Error('Merci de mettre l\'image du timbre.');
      } else if (this.timbreForm.value.categorie == 'tas' && this.timbreForm.value.tasType === null) {
        throw new Error('Merci de renseigner le type de TAS.');
      } else if (this.timbreForm.value.categorie == 'cd' && (this.timbreForm.value.anneeCoinDate === null || this.timbreForm.value.anneeCoinDate === '')) {
        throw new Error('Merci de renseigner l\'année du timbre.');
      }
      else {
        this.responseImageUploadUrl = await this.uploadImg();
        this.timbreForm.patchValue({ image: this.responseImageUploadUrl.secure_url });
        if (this.timbreForm.value.categorie == 'classic' && this.timbreForm.value.isPaire == true) {
          this.timbreForm.patchValue({ tasType: "Paire" });
        }
        this.timbreService.addTimbre(this.timbreForm.value).subscribe(data => {
          this.toastService.showSuccess(`Timbre n°${this.timbreForm.value.numero} créé`);
          this.setupForm();
          // this.getAllTimbres();
        });
      }

    } catch (error) {
      this.logger.error(error, "admin-gestion-timbres.component");
      this.toastService.showDanger(error);
    }
  }

  async uploadImg(): Promise<any> {
    try {
      return await this.fileUploadService.upload(this.selectedImage, this.imageFile.name.split('.').slice(0, -1)[0]);
    } catch (error) {
      this.logger.error(error, "admin-gestion-timbres.component");
      this.toastService.showDanger(error);
    }
  }

  deleteTimbreById(timbre) {
    try {
      this.timbreService.deleteTimbreById(timbre.timbreId).subscribe(data => {
        if (data === 1) {
          this.timbreList.splice(this.timbreList.indexOf(timbre), 1);
          this.toastService.showSuccess(`Timbre n°${timbre.numeroTimbre} supprimé`);
        }
      });
    } catch (error) {
      this.logger.error(error, "admin-gestion-timbres.component");
      this.toastService.showDanger(error);
    }
  }

  changeTimbreQte(timbre, operation) {
    if (operation === 'plus') {
      timbre.quantiteTimbre += 1;
      this.timbreService.incrementTimbreQuantity(timbre.timbreId, 1).subscribe(data => {
      });
    } else if (operation === 'minus') {
      this.timbreService.decrementTimbreQuantity(timbre.timbreId, 1).subscribe(data => {
      });
      timbre.quantiteTimbre -= 1;
    }
  }

  updateTimbre(timbre) {
    try {
      this.timbreService.updateTimbre(timbre).subscribe(data => {
        console.log(data);
        this.timbreList.splice(this.timbreList.indexOf(this.timbreList.find(x => x.timbreId == this.timbreForEdition.timbreId)), 1, this.timbreForEdition);
        this.editableTimbreId = 0;
        this.toastService.showSuccess('Timbre n°' + timbre.numeroTimbre + ' mis à jour.');
      })
    } catch (error) {
      this.logger.error(error, "admin-gestion-timbres.component");
      this.toastService.showDanger(error);
    }
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
