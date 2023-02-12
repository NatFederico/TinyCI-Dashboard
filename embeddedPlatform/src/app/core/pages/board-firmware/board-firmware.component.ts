import { Component } from "@angular/core";

@Component({
    selector: 'app-board-firmware',
    templateUrl: './board-firmware.component.html',
    styleUrls: ['./board-firmware.component.scss']
})
export class BoardFirmwareComponent {
    firmware = null;
    firmwareText = "";

    submitForm() {
        // Handle form submit here
        console.log(this.firmware)
      }
    
      uploadFile(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          this.firmwareText = reader.result as string;
        };
      }
}