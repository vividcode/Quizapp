export class Question {
    id: number;
    questionText: string;
    ans1: string;
    ans2: string;
    ans3: string;
    correctIdx: number;

    getCorrectAnswer() {
        switch (this.correctIdx)
        {
            case 1:
                return this.ans1;
            case 2:
                return this.ans2;
            case 3:
                return this.ans3;
            default:
                return '';
        }
    }
  }