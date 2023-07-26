import { Component, OnInit } from '@angular/core';
import { CountryService } from './service/country.service';
import { Country } from './model/country';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({
    by: new FormControl("0", [Validators.pattern(new RegExp("[^0]"))]),
    search: new FormControl("", [Validators.required]),
  });

  searchOptions = {
    name: "name",
    capital: "capital",
    continent: "region"
  }

  countries: Country[] = [];
  loading: boolean = false;
  submitted: boolean = false;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.getCountries();
  }

  //TODO: AN INTERCEPTOR SHOULD BE USED FOR GLOBAL EXCEPTIONS

  getCountries(): void {
    this.countryService.getAll().subscribe({
      next: (data) => this.countries = data,
      error: (err) => {
        console.error(err);
        alert("Something went wrong");
      },
      complete: () => {
        this.loading = true;
      }
    });
  }

  search(): void {
    console.log("Search");
    this.submitted = true;

    if (this.searchForm.valid) {
      //TODO: BUSCAR
      console.log("Valid");
      this.loading = false;

      const value: string = this.searchForm.get("search")?.value;

      switch (this.searchForm.get("by")?.value) {
        case "1": this.searchBy(this.searchOptions.name, value); break;
        case "2": this.searchBy(this.searchOptions.capital, value); break;
        case "3": this.searchBy(this.searchOptions.continent, value); break;
        default: this.getCountries(); this.resetForm();break;
      }

    } else console.log("Invalid");

  }

  searchBy(by: string, value: string) {
    this.countryService.getBy(by, value).subscribe({
      next: (data) => this.countries = data,
      error: (err) => {
        console.error(err);
        alert(err.error.message);
        this.resetForm();
        this.getCountries();
      },
      complete: () => this.loading = true,
    });
  }

  resetForm() {
    this.searchForm.get("by")?.setValue("0");
    this.searchForm.get("search")?.setValue("");
    this.submitted = false;
  }
}
