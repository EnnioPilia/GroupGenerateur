import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,  // << ajoute ceci
      // autres imports...
    ],
    declarations: [LoginComponent],
    // providers etc.
  }).compileComponents();
});
});
