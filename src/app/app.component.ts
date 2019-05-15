import { Component, OnInit } from '@angular/core';
import { trigger,state,style,animate,transition } from '@angular/animations';
import { Question } from './Question';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    // animation triggers go here
  ]
})
export class AppComponent implements OnInit {

  question: Question;
  questionArray: any;
  currentIdx: number;

  ngOnInit(): void 
  {
    this.currentIdx = 0;
    this.questionArray = [];
  }

  title = 'QuizApp';

  getCurrentQuestionText() {
    if (this.questionArray === 'undefined' || this.questionArray.length == 0)
    {
      return "";
    }
    let question = this.questionArray[this.currentIdx];
    return question.questionText;
  }

  getAns1() {
    if (this.questionArray === 'undefined' || this.questionArray.length == 0)
    {
      return "";
    }
    let question = this.questionArray[this.currentIdx];
    return question.ans1;
  }

  getAns2() {
    if (this.questionArray === 'undefined' || this.questionArray.length == 0)
    {
      return "";
    }
    let question = this.questionArray[this.currentIdx];
    return question.ans2;
  }

  getAns3() {
    if (this.questionArray === 'undefined' || this.questionArray.length == 0)
    {
      return "";
    }
    let question = this.questionArray[this.currentIdx];
    return question.ans3;
  }

  goNext() {
    if ((this.currentIdx + 1) == this.questionArray.length)
    {
      this.currentIdx = 0;
    }
    else
    {
      this.currentIdx = this.currentIdx + 1;
    }
  }

  public changeListener(files: FileList) {

    if(files && files.length > 0) {
       let file : File = files.item(0); 
         console.log(file.name);
         console.log(file.size);
         console.log(file.type);
         let reader: FileReader = new FileReader();
         reader.readAsText(file);
         reader.onload = (e) => {
            let csv: string = reader.result as string;
            console.log(csv);
            let allTextLines = csv.split(/\r?\n|\r/);
         
            for ( let i = 0; i < allTextLines.length; i++) {
              // split content based on comma
              let data = allTextLines[i].split(',');
                  let q = new Question();
                  q.questionText = data[0];
                  q.ans1 = data[1];
                  q.ans2 = data[2];
                  q.ans3 = data[3];
                  q.correctIdx = parseInt(data[4], 10);

                  this.questionArray.push(q);
            }
         }
      }
  }
}
