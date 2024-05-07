import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductCatalogModel } from 'src/app/Models/Product-catalog';
import { AuthService } from 'src/app/Services/auth.service';
import { RewardService } from 'src/app/Services/reward.service';
import { SnackService } from 'src/app/Services/snack.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  rewardForm!: FormGroup;



  rewardId!: number
  reward!: ProductCatalogModel
  rewards: ProductCatalogModel[] = [];


  constructor(private route: ActivatedRoute, private fb: FormBuilder, private rewardService: RewardService, private authService: AuthService,private snackService:SnackService) { }
  signout() {
    this.authService.signout();
  }
  ngOnInit() {
    this.rewardForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      manufacturer: ['', Validators.required],
      description: [''],
      quantity: [0, Validators.required],
      bytesValue: [0, Validators.required],
      productImage: ['', Validators.required]

    });

    this.rewardId = Number(this.route.snapshot.paramMap.get('id'))

    this.rewardService.getReward(this.rewardId).subscribe(res => {
      this.reward = res
      console.log(res)
      this.rewardForm.patchValue(this.reward)

    })

  }
  cancel(): void {
    this.rewardForm.reset();
  }

  onSelectFile(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      console.log(file)
      const reader = new FileReader();
      reader.onloadend = (e) => {
        this.rewardForm.value.productImage = e.target?.result!
      };
      reader.readAsDataURL(file);

    }
  }

  save() {
    if (this.rewardForm.valid) {

      const newReward = this.rewardForm.value;
      console.log(this.rewardId);
      console.log(newReward);

      this.rewardService.updateProduct(this.rewardId, { ...newReward, id: this.rewardId }).subscribe(
        (createdReward) => {

          this.rewardForm.reset();
          this.snackService.openSnackBar("Product Added Successfully");

        },
      );
    }




  }
}