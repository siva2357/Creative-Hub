import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp-verification-page',
  templateUrl: './otp-verification-page.component.html',
  styleUrls: ['./otp-verification-page.component.css']
})
export class OtpVerificationPageComponent  implements OnInit {
  
  otpForm: FormGroup = new FormGroup({
    otp1: new FormControl('', Validators.required),
    otp2: new FormControl('', Validators.required),
    otp3: new FormControl('', Validators.required),
    otp4: new FormControl('', Validators.required),
    otp5: new FormControl('', Validators.required),
    otp6: new FormControl('', Validators.required)
  });

  otpKeys: string[] = Object.keys(this.otpForm.controls);

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  constructor() {}

  ngOnInit(): void {}

  handleInput(index: number, event: any): void {
    const inputValue = event.target.value;
    if (inputValue.length === 1 && index < this.otpKeys.length - 1) {
      const nextInput = this.otpInputs.get(index + 1);
      if (nextInput) {
        nextInput.nativeElement.focus();
      }
    }
  }

  handleBackspace(index: number, event: any): void {
    if (event.key === 'Backspace' && index > 0 && !event.target.value) {
      const prevInput = this.otpInputs.get(index - 1);
      if (prevInput) {
        prevInput.nativeElement.focus();
      }
    }
  }

  submitOtp(): void {
    if (this.otpForm.valid) {
      const otpCode = Object.values(this.otpForm.value).join('');
      console.log('Entered OTP:', otpCode);
      // Implement verification logic here
    }
  }
}
