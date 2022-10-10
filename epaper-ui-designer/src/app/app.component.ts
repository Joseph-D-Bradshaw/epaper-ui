import { Component } from '@angular/core';
import domtoimage from 'dom-to-image'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'epaper-ui-designer';

  convertToImage(elementId: string) {
    let node = document.getElementById(elementId)
    if (!node)
      return
    domtoimage.toPng(node, {width: 715, height: 264}).then((dataUrl) => {
      let link = document.createElement('a')
      link.download = `${elementId}.png`
      link.href = dataUrl
      link.click()
    })
  }
}
