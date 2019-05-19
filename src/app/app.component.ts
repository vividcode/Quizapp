import { Component, OnInit } from '@angular/core';
import { trigger,state,style,animate,transition } from '@angular/animations';
import { Question } from './Question';
import { CurrencyIndex } from '@angular/common/src/i18n/locale_data';
import { getRenderedText } from '@angular/core/src/render3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-1000%)' }),
        animate('1s 0s ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})

export class AppComponent implements OnInit {

  question: Question;
  questionArray: any;
  currentIdx: number;
  answerSelected: Boolean;
  answerIsCorrect: Boolean;
  smileyDict: any = {"correctAnswer":"🙂", "inCorrectAnswer":"😞", "noAnswer":"🤔"};
  checkDict: any = {"correctAnswer":"✅", "inCorrectAnswer":"❌", "noAnswer":"?"};
   
  ngOnInit(): void 
  {
    this.currentIdx = 0;
    this.questionArray = [];
  }

  title = 'QuizApp';

  isCSVLoaded() {
    if (this.questionArray === 'undefined' || this.questionArray.length == 0)
    {
      return false;
    }

    return true;
  }

  getButtoTitle() {

  }

  getCurrentQuestionText() {
    if (this.questionArray === 'undefined' || this.questionArray.length == 0)
    {
      return "";
    }
    let question = this.questionArray[this.currentIdx];
    return question.questionText;
  }

  getQuestionIdxString() {
    if (this.questionArray === 'undefined' || this.questionArray.length == 0)
    {
      return "";
    }

    let str = "Question " + (this.currentIdx + 1).toString() + ' Of ' + this.questionArray.length.toString();
    return str;
  }

  evaluateAnswer(event: { target: any; srcElement: any; currentTarget: any; }) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    let question = this.questionArray[this.currentIdx];
    var isCorrectAnsSelected = false;
    
    if ((value == "ans1" && question.correctIdx == 1) ||
        (value == "ans2" && question.correctIdx == 2) ||
        (value == "ans3" && question.correctIdx == 3))
    {
        isCorrectAnsSelected = true;
    }

    this.answerSelected = true;
    this.answerIsCorrect = isCorrectAnsSelected;

    // let className = isCorrectAnsSelected ? 'button-red' : 'button-green';
    // console.log(className);

    // event.srcElement.myDynamicClass = className;
    // event.target.class = event.srcElement.myDynamicClass;
    // console.log(event.srcElement.myDynamicClass);
    return isCorrectAnsSelected;
  }

  getColor(index: number) {
    let question = this.questionArray[this.currentIdx];
    if (this.answerSelected == true)
    {
      if ((index == 1 && question.correctIdx == 1) ||
          (index == 2  && question.correctIdx == 2)  ||
          (index == 3  && question.correctIdx == 3))
      {
        return 'green';
      }
      return 'red';
    }

    return 'grey';
  }

  getText(isSmiley: Boolean) {
    console.log("getText");
    let key = (this.answerSelected) ? (this.answerIsCorrect ? "correctAnswer": "inCorrectAnswer") : "noAnswer";
    console.log("key: " + key);
    if (isSmiley) {
      let smiley = this.smileyDict[key];
      return smiley;
    } 
    else
    {
      let check = this.checkDict[key];
      return check;
    }
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

    this.answerSelected = false;
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
