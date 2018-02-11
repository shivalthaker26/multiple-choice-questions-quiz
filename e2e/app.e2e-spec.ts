import { AssessmentQuizPage } from './app.po';

describe('assessment-quiz App', () => {
  let page: AssessmentQuizPage;

  beforeEach(() => {
    page = new AssessmentQuizPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
