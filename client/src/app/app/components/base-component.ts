import { Injector, Input } from '@angular/core';
import { SearchCriteria } from '../search-criteria';
import { Dictionary } from '../helpers/dictionary';

export class BaseComponent {
    postInProgress = false;

    staticErrorMessage = ''
    staticSuccessMessage = ''

    progressMessage = '';
    errorMessage = ''
    successMessage = '';
    hasError: boolean = false;

    filter: SearchCriteria[];
    sort: Dictionary;

    constructor() {
    }

    startProgress(message: string) {
        this.postInProgress = true;
        this.progressMessage = message;
        this.errorMessage = "";
        this.successMessage = "";
        this.hasError = false;
    }

    stopProgress() {
        this.postInProgress = false;
        this.progressMessage = '';
    }


}
