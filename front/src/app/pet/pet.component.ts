import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PetService } from '../_services/pet.service';
import { Pet } from '../_services/pet.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
  pets : Pet[] = [];
  updating : boolean = false;
  loading : boolean = false;
  petForm = new FormGroup({
    id : new FormControl(''),
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    owner: new FormControl('', Validators.required)
  });

  constructor(private petService : PetService) { }

  ngOnInit(): void {
    this.getAllPets();
  }
  reInit(){
    this.petForm.reset();
    this.ngOnInit();
  }
  getAllPets(){
    this.loading = true;
    this.petService.list().subscribe( data => {
      this.pets = data;
      this.loading = false;
    }) 
  }
  savePet(){
    this.petService.insert(this.petForm.value)
    .subscribe( insertedPet => {
      if(insertedPet.id){
        this.reInit();
      }else{
        alert("something went wrong");
      }
    });
  }
  updatePet(){
    this.petService.update(this.petForm.value)
    .subscribe( () => {
      this.reInit();
    });
  }
  confirmDeletePet(pet: Pet){
    const confirmDelete = confirm(`are you sure about delete ${pet.name}`)
    if(confirmDelete){
      this.deletePet(pet)
    }
  }
  deletePet(pet: Pet){
    pet.status = false;
    this.petService.update(pet)
    .subscribe( () => {
      this.reInit();
    });
  }
  setPet(pet:Pet){
    this.petForm.reset();
    this.petForm.controls['name'].setValue(pet.name);
    this.petForm.controls['age'].setValue(pet.age);
    this.petForm.controls['owner'].setValue(pet.owner);
    this.petForm.controls['id'].setValue(pet.id);
    this.updating = true;
  }
  cancelUpdate(){
    this.updating = false;
    this.petForm.reset();
  }
}
