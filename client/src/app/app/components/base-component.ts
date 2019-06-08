import { ToastrService } from 'ngx-toastr';

export class BaseComponent {
    postInProgress = false;

    progressMessage = '';
    errorMessage = ''
    successMessage = '';
    hasError: boolean = false;

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
